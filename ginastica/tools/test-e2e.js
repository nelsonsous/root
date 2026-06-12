const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

  const url = 'file://' + __dirname + '/../index.html';
  await page.goto(url);
  await page.waitForTimeout(500);

  // Novo jogo
  await page.click('#btn-new');
  await page.waitForTimeout(800);
  console.log('gym visible:', await page.isVisible('#screen-gym'));

  // Vestiário
  await page.click('#btn-wardrobe');
  await page.waitForTimeout(400);
  // muda algumas opções
  const swatches = await page.$$('#custom-options .swatch');
  if (swatches.length) await swatches[2].click();
  const chips = await page.$$('#custom-options .opt-chip');
  if (chips.length) await chips[1].click();
  // tab da atleta 1
  const tabs = await page.$$('#custom-tabs button');
  await tabs[1].click();
  await page.waitForTimeout(300);
  await page.click('#btn-custom-done');
  await page.waitForTimeout(300);

  // Treinar a 1ª atleta
  for (let week = 0; week < 5; week++) {
    const cards = await page.$$('#athlete-cards .card');
    for (let i = 0; i < cards.length; i++) {
      const btns = await page.$$(`#athlete-cards .card:nth-child(${i + 1}) .actions button`);
      if (!btns.length) continue;
      const label = await btns[0].textContent();
      if (label.includes('Treinar') && !(await btns[0].isDisabled())) {
        await btns[0].click();
        await page.waitForTimeout(300);
        // escolhe um movimento diferente em cada semana
        const moves = await page.$$('.move-item:not(.locked)');
        await moves[(i + week) % moves.length].click();
        await page.waitForTimeout(600);
        await page.click('#btn-to-rate');
        await page.waitForTimeout(200);
        await page.click('#star-row span:nth-child(3)');
        await page.waitForTimeout(600);
        await page.click('#fix-options button:nth-child(1)');
        await page.waitForTimeout(300);
        await page.click('#btn-tr-done');
        await page.waitForTimeout(300);
      } else {
        // descansar
        await btns[1] ? btns[1].click() : btns[0].click();
        await page.waitForTimeout(200);
      }
    }
    if (await page.isVisible('#btn-endweek')) {
      await page.click('#btn-endweek');
      await page.waitForTimeout(300);
    }
    if (await page.isVisible('#btn-competition')) break;
  }

  console.log('competition btn visible:', await page.isVisible('#btn-competition'));
  await page.click('#btn-competition');
  await page.waitForTimeout(400);

  // monta coreografias: para cada atleta clica chips disponíveis
  const T_slots = 3;
  for (let i = 0; i < 3; i++) {
    const ctabs = await page.$$('#choreo-tabs button');
    await ctabs[i].click();
    await page.waitForTimeout(200);
    for (let k = 0; k < T_slots; k++) {
      const av = await page.$$('#choreo-available .chip:not(.disabled)');
      if (!av.length) break;
      await av[0].click();
      await page.waitForTimeout(150);
    }
  }
  const startDisabled = await page.isDisabled('#btn-start-comp');
  console.log('start-comp disabled:', startDisabled);

  if (!startDisabled) {
    // preview rápido
    await page.click('#btn-preview');
    await page.waitForTimeout(1500);
    await page.click('#btn-start-comp');
    // competição corre animações longas
    await page.waitForSelector('#btn-comp-next:not(.hidden)', { timeout: 120000 });
    console.log('competition finished, status:', (await page.textContent('#comp-status')).slice(0, 120));
    await page.click('#btn-comp-next');
    await page.waitForTimeout(500);
    console.log('after comp, gym visible:', await page.isVisible('#screen-gym'), '| final visible:', await page.isVisible('#screen-final'));
  }

  console.log('--- ERRORS ---');
  console.log(errors.length ? errors.join('\n') : '(none)');
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error('FATAL:', e.message); process.exit(2); });
