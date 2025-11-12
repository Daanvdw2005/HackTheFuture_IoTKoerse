// utils/helpers.js
const fs = require('fs');

async function saveDebug(page, prefix = 'error') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = `debug_${prefix}_${timestamp}.png`;
  const htmlPath = `debug_${prefix}_${timestamp}.html`;

  await page.screenshot({ path: screenshotPath, fullPage: true });
  const html = await page.content();
  fs.writeFileSync(htmlPath, html);

  console.log(`Debug opgeslagen: ${screenshotPath} + ${htmlPath}`);
}

module.exports = { saveDebug };