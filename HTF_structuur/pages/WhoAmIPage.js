// pages/WhoAmIPage.js
class WhoAmIPage {
  constructor(page) {
    this.page = page;
    this.whoami = page.locator('#whoami');
  }

  async fillForm(name, age, country) {
    console.log('5. Wachten op #whoami...');
    await this.whoami.waitFor({ state: 'visible', timeout: 20000 });

    const nameInput = this.whoami.locator('input[type="text"]');
    const ageInput = this.whoami.locator('input[type="number"]');
    const countrySelect = this.whoami.locator('select');
    const startGameButton = this.whoami.locator('button:has-text("Start Game")');

    await nameInput.fill(name);
    await ageInput.fill(age);
    await countrySelect.selectOption({ label: country });
    await countrySelect.evaluate(e => e.dispatchEvent(new Event('change', { bubbles: true })));
    await this.page.waitForTimeout(600);
    await startGameButton.click({ force: true });
    console.log('Start Game geklikt.');
  }

  async clickStartGame() {
    // Wordt al gedaan in fillForm, maar kan apart als nodig
  }
}

module.exports = WhoAmIPage;