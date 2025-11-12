// pages/CrashPage.js
const { config } = require('../config/config');

class CrashPage {
  constructor(page) {
    this.page = page;
    this.square = page.locator('div.square');
  }

  async doubleClickSquare() {
    console.log('CRASH: Wachten op .square...');
    await this.page.goto(`${config.baseUrl}/crash`, { waitUntil: config.waitUntil });

    await this.square.waitFor({ state: 'visible', timeout: config.timeouts.element });
    console.log('Square zichtbaar → dubbelklik!');
    await this.square.dblclick({ force: true });
    console.log('Square dubbelgeklikt!');
  }
}

module.exports = CrashPage;