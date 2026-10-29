import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { completeCloud, gotoLanding, openSimulator } from './helpers';

test('metadados próprios de Cloud, sem canonical de outra landing', async ({ page }) => {
  await gotoLanding(page);
  await expect(page).toHaveTitle('Cloud para Empresas | Nuvem Privada sob Medida | MSSERVER');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Cloud sob demanda/);
  // Sem URL publicada definida: sem canonical e sem indexação.
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('link[hreflang]')).toHaveCount(0);
  await expect(page.locator('h1')).toHaveCount(1);
  const og = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(og).toMatch(/og-cloud-msserver\.jpg$/);
  expect((await page.request.get(new URL(og!).pathname)).ok()).toBe(true);
  const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? '[]');
  expect(ld.map((x: { '@type': string }) => x['@type'])).toEqual(['Organization', 'FAQPage']);
  const faqLd = ld[1].mainEntity.map((q: { name: string }) => q.name);
  expect(faqLd).toEqual(await page.locator('#duvidas summary h3').allTextContents());
});

test('conteúdo exclusivo de Cloud: sem hardware físico, catálogo ou preços', async ({ page }) => {
  await gotoLanding(page);
  const text = (await page.locator('main').innerText()).replace(/\s+/g, ' ');
  for (const banned of [/R\$\s?\d/, /Dell|PowerEdge|ProLiant|Lenovo|\bHPE?\b|\bIBM\b/, /extensão de garantia/i, /comprar servidor|Ver no catálogo/i, /Xeon/]) {
    expect(text, String(banned)).not.toMatch(banned);
  }
  await expect(page.locator('#equipamentos, #modalidades, .cat-card')).toHaveCount(0);
  for (const id of ['inicio', 'beneficios', 'solucoes', 'simulador', 'aplicacoes', 'diferenciais', 'processo', 'clientes', 'duvidas']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test('links internos e de WhatsApp', async ({ page }) => {
  await gotoLanding(page);
  const hashes = await page.$$eval('a[href^="#"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')!))]);
  for (const h of hashes) expect(await page.locator(h).count(), `destino de ${h}`).toBeGreaterThan(0);
  const wa = await page.$$eval('a[href*="wa.me"]', (as) => as.map((a) => a.getAttribute('href')!));
  expect(wa.length).toBeGreaterThanOrEqual(6);
  for (const href of wa) {
    expect(href).toMatch(/^https:\/\/wa\.me\/5511985991837\?text=/);
    expect(decodeURIComponent(new URL(href).searchParams.get('text')!)).toMatch(/Cloud|nuvem/);
  }
});

test('imagens, fontes e rolagem horizontal', async ({ page, baseURL }) => {
  const failed: string[] = [];
  const errors: string[] = [];
  page.on('response', (r) => r.url().startsWith(baseURL!) && r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`));
  page.on('pageerror', (e) => errors.push(String(e)));
  await gotoLanding(page);
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  await page.waitForLoadState('networkidle');
  expect(await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src))).toEqual([]);
  expect(failed).toEqual([]);
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').length)).toBeGreaterThanOrEqual(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
});

test('sem violações de acessibilidade (axe, WCAG A/AA) na página', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await gotoLanding(page);
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
});

test('sem violações de acessibilidade no resumo do simulador', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openSimulator(page);
  await completeCloud(page);
  const results = await new AxeBuilder({ page }).include('[data-simulator]').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
});

test('menu móvel', async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 1440) >= 1100, 'somente telas menores');
  await gotoLanding(page);
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  const menu = page.locator('#menu-movel');
  await expect(menu.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute('href', /wa\.me\/5511985991837/);
  await menu.getByRole('link', { name: 'Simulador' }).click();
  await expect(menu).toBeHidden();
});
