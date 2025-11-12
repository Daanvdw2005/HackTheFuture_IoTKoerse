// pages/SubmarinePage.js
class SubmarinePage {
  constructor(page) {
    this.page = page;
    this.instructionImg = page.locator('#instruction img.arrow');
  }

  async gotoSubmarine() {
    console.log('21. Forceren naar /submarine...');
    await this.page.goto('https://hackthefuture.bignited.be/submarine', { waitUntil: 'networkidle' });
    console.log('Geladen: /submarine');
  }

  async followArrows() {
    console.log('22. Start submarine level: volg de pijlen...');

    // Eerste zichtbaarheid wachten
    try {
      await this.instructionImg.waitFor({ state: 'visible', timeout: 20000 });
    } catch {
      console.log('⚠️ Geen eerste pijl gevonden — mogelijk is het level al klaar.');
      return;
    }

    let sequenceCount = 0;
    const maxSequences = 50;

    while (sequenceCount < maxSequences) {
      // --- SAFE WAIT (vang timeout af) ---
      const arrowVisible = await this.instructionImg
        .waitFor({ state: 'visible', timeout: 10000 })
        .then(() => true)
        .catch(() => false);

      if (!arrowVisible) {
        console.log('✅ Geen nieuwe pijl meer — submarine level klaar.');
        break; // Geen crash → gewoon afsluiten
      }

      const src = await this.instructionImg.getAttribute('src');
      console.log(`   Pijl: ${src}`);

      let key = '';
      if (src.includes('left.png')) key = 'ArrowLeft';
      else if (src.includes('right.png')) key = 'ArrowRight';
      else if (src.includes('up.png')) key = 'ArrowUp';
      else if (src.includes('down.png')) key = 'ArrowDown';
      else {
        console.log('   Onbekende pijl, wacht...');
        await this.page.waitForTimeout(500);
        continue;
      }

      await this.page.keyboard.press(key);
      console.log(`   → ${key} ingedrukt`);
      sequenceCount++;

      // Wachten tot de pijl verdwijnt (of timeout negeren)
      try {
        await this.instructionImg.waitFor({ state: 'hidden', timeout: 3000 });
        console.log('   Pijl verdwenen → volgende');
      } catch {
        console.log('   ⏱️ Pijl bleef even staan, verder met volgende...');
        await this.page.waitForTimeout(800);
      }

      // Check of level al voorbij is
      const currentUrl = this.page.url();
      if (!currentUrl.includes('/submarine')) {
        console.log('URL veranderd → level voltooid!');
        break;
      }

      // Check of dezelfde pijl blijft hangen
      const newSrc = await this.instructionImg.getAttribute('src').catch(() => null);
      if (newSrc === src) {
        console.log('   Pijl niet veranderd → wacht extra');
        await this.page.waitForTimeout(1000);
      }
    }

    console.log(`Submarine level voltooid na ${sequenceCount} pijlen!`);
  }

  async waitForNextLevel() {
    console.log('23. Wachten op overgang naar volgend level...');
    await this.page.waitForTimeout(500);
    console.log('ALLES VOLTOOID: Office → Docking Bay → Submarine pijlen!');
    console.log('Script succesvol afgerond!');
  }
}

module.exports = SubmarinePage;
