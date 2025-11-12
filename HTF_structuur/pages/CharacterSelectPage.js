// pages/CharacterSelectPage.js
class CharacterSelectPage {
  constructor(page) {
    this.page = page;
    this.maleButton = page.locator('#male');
    this.yesButton = page.locator('div.buttons button:has-text("Yes")');
  }

  async selectMale() {
    console.log('3. Wachten op karakterselectie...');
    await this.maleButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.maleButton.click({ force: true });
  }

  async confirmYes() {
    console.log('4. Bevestigen met Yes...');
    await this.yesButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.yesButton.click({ force: true });
  }
}

module.exports = CharacterSelectPage;