// pages/DockingBayPage.js
class DockingBayPage {
  constructor(page) {
    this.page = page;
  }

  async gotoDockingBay() {
    console.log('14. Navigeren naar /docking-bay...');
    await this.page.goto('https://hackthefuture.bignited.be/docking-bay', { waitUntil: 'networkidle' });
    console.log('Geladen: /docking-bay');
  }

  async waitForRandomValuesAndSwitches() {
    console.log('15. Wachten op random values en switches...');
    await this.page.locator('#randomValue-0').waitFor({ state: 'visible', timeout: 20000 });
    await this.page.locator('#switch-0').waitFor({ state: 'visible', timeout: 10000 });
    console.log('Random values en switches zichtbaar.');
  }

  async readRandomValues() {
    console.log('16. Uitlezen van random values...');
    const randomValues = [];
    for (let i = 0; i < 5; i++) {
      const value = await this.page.locator(`#randomValue-${i}`).innerText();
      const num = parseInt(value.trim(), 10);
      randomValues.push(num);
      console.log(`   randomValue-${i}: ${num}`);
    }
    return randomValues;
  }

  async setSwitches(randomValues) {
    console.log('17. Instellen van switches...');
    for (let i = 0; i < 5; i++) {
      const switchEl = this.page.locator(`#switch-${i}`);
      const targetState = randomValues[i] === 1 ? 'up' : 'down';

      while (true) {
        const classNow = await switchEl.getAttribute('class');
        const isUp = classNow.includes('up');
        const isDown = classNow.includes('down');

        if ((targetState === 'up' && isUp) || (targetState === 'down' && isDown)) {
          console.log(`   Switch ${i} correct: ${targetState}`);
          break;
        }

        await switchEl.click({ force: true });
        await this.page.waitForTimeout(300);
      }
    }
  }

  async waitForDropButtonActive() {
    console.log('18. Wachten tot DROP knop actief...');
    const dropButton = this.page.locator('#button');
    await dropButton.waitFor({ state: 'visible', timeout: 10000 });

    await this.page.waitForFunction(() => {
      const btn = document.querySelector('#button');
      return btn && !btn.hasAttribute('disabled');
    }, { timeout: 15000 });

    console.log('DROP knop actief!');
  }

  async clickDrop() {
    console.log('19. Klikken op DROP...');
    const dropButton = this.page.locator('#button');
    await dropButton.click({ force: true });
    console.log('DROP geklikt!');
  }

  async waitAfterDrop() {
    console.log('20. Wachten na DROP (animatie)...');
    await this.page.waitForTimeout(3000);
  }

  async clickSubmarine() {
    console.log('21. Wachten op duikboot (#submarine)...');
    const submarine = this.page.locator('#submarine');
    await submarine.waitFor({ state: 'visible', timeout: 15000 });

    await this.page.waitForFunction(() => {
      const el = document.querySelector('#submarine');
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }, { timeout: 10000 });

    console.log('Duikboot zichtbaar en klikbaar!');
    await submarine.click({ force: true });
    console.log('Duikboot geklikt!');
  }

  async waitForNextLevel() {
    console.log('22. Wachten op overgang naar volgende level...');
    await this.page.waitForTimeout(500);
    console.log('LEVEL VOLTOOID: Docking Bay → DROP → DUIKBOOT GEKLIKT!');
  }
}

module.exports = DockingBayPage;