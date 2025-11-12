// pages/OfficePage.js
class OfficePage {
  constructor(page) {
    this.page = page;
    this.letters = page.locator('#letters.letters');
    this.letterPopup = page.locator('#popup.popup');
    this.closeLetter = page.locator('#popup .close');
    this.crystalDiv = page.locator('div#crystal.crystal');
    this.crystalPopup = page.locator('#popup-image.popup');
    this.imageCrystal = this.crystalPopup.locator('#image-crystal');
  }

  async gotoOffice() {
    console.log('6. Forceren naar /office...');
    await this.page.goto('https://hackthefuture.bignited.be/office', { waitUntil: 'networkidle' });
    console.log('Geladen: /office');
  }

  async clickLetters() {
    console.log('7. Klikken op papieren...');
    // Give a bit more time for different browsers/animations
    await this.letters.waitFor({ state: 'visible', timeout: 40000 });
    await this.letters.click({ force: true });
    console.log('Papieren geklikt.');
  }

  async closeLetterPopup() {
    console.log('8. Wachten op brief popup...');
    await this.letterPopup.waitFor({ state: 'visible', timeout: 30000 });
    await this.closeLetter.waitFor({ state: 'visible', timeout: 10000 });
    await this.closeLetter.click({ force: true });
    await this.letterPopup.waitFor({ state: 'hidden', timeout: 10000 });
    console.log('Brief gesloten.');
  }

  async waitForCrystalOnFloor() {
    console.log('9. Wachten op kristal op vloer (opacity: 1)...');
    await this.crystalDiv.waitFor({ state: 'attached', timeout: 30000 });

    // Use selector as the argument and pass options as the 3rd param.
    // This avoids accidentally treating the options object as the function arg
    // and ensures the timeout is applied.
    await this.page.waitForFunction(selector => {
      const el = document.querySelector(selector);
      if (!el) return false;
      return window.getComputedStyle(el).opacity === '1';
    }, 'div#crystal.crystal', { timeout: 30000 });

    console.log('Kristal is volledig zichtbaar!');
  }

  async clickCrystalOnFloor() {
    console.log('10. Klikken op kristal op vloer...');
    await this.crystalDiv.click({ force: true });
    console.log('Kristal op vloer geklikt.');
  }

  async waitForCrystalPopup() {
    console.log('11. Wachten op kristal popup...');
    // Popup visibility can depend on animations. Give extra time.
    await this.crystalPopup.waitFor({ state: 'visible', timeout: 60000 });
    console.log('Kristal popup zichtbaar.');
  }

  async clickBigCrystalInPopup() {
    console.log('12. Klikken op #image-crystal...');
    await this.imageCrystal.waitFor({ state: 'visible', timeout: 15000 });
    await this.imageCrystal.click({ force: true });
    console.log('Groot kristal in popup geklikt.');
  }

  async waitForPopupToClose() {
    console.log('13. Wachten tot popup verdwijnt...');
    await this.crystalPopup.waitFor({ state: 'hidden', timeout: 20000 });
    console.log('Kristal popup gesloten.');
  }
}

module.exports = OfficePage;