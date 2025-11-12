// pages/CavePage.js
export default class CavePage {
  constructor(page) {
    this.page = page;
  }

  async waitForCaveLoaded() {
    await this.page.waitForFunction(() => {
      return document.querySelectorAll('[class*="square"]').length === 4;
    }, { timeout: 10000 });
  }

  async hoverSquare(index) {
    const selector = `#square-${index}`;
    await this.page.waitForSelector(selector);
    const box = await this.page.locator(selector).boundingBox();
    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.waitForTimeout(1000);
  }

  async hasCrystalGlowing() {
    return await this.page.locator('.crystal.glowing, [class*="crystal"][class*="glowing"]').count() > 0;
  }

  async findCorrectCave() {
    console.log('HOVER alle caves - zoek .crystal.glowing...');
    
    for (let i = 0; i < 4; i++) {
      console.log(`\nCave ${i} testen...`);
      await this.hoverSquare(i);
      
      if (await this.hasCrystalGlowing()) {
        console.log(`JUIST! Cave ${i} heeft crystal glowing`);
        return i;
      } else {
        console.log(`Cave ${i}: geen crystal glowing`);
      }
    }
    throw new Error('Geen crystal glowing gevonden!');
  }

  async solveCave(correctIndex) {
    console.log(`Hover cave ${correctIndex}...`);
    await this.hoverSquare(correctIndex);
    
    await this.page.waitForSelector('.crystal.glowing, [class*="crystal"][class*="glowing"]', { timeout: 5000 });
    console.log('Crystal glowing zichtbaar');
    
    await this.page.dblclick(`#square-${correctIndex}`);
    console.log('Double-click uitgevoerd - naar next level');
  }
}