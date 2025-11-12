// pages/HomePage.js
class HomePage {
  constructor(page) {
    this.page = page;
    this.startButton = page.locator('button:has-text("START")');
  }

  async open() {
    console.log('1. Openen van homepage...');
    await this.page.goto('https://hackthefuture.bignited.be/home', { waitUntil: 'networkidle' });
  }

  async clickStart() {
    console.log('2. Wachten op START knop...');
    await this.startButton.waitFor({ state: 'visible', timeout: 20000 });
    await this.startButton.click({ force: true });
    console.log('START geklikt.');
  }
}

module.exports = HomePage;