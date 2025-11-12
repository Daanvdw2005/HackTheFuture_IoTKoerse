import { test } from '@playwright/test';
import HomePage from '../pages/HomePage.js';
import CharacterSelectPage from '../pages/CharacterSelectPage.js';
import WhoAmIPage from '../pages/WhoAmIPage.js';
import OfficePage from '../pages/OfficePage.js';
import DockingBayPage from '../pages/DockingBayPage.js';
import SubmarinePage from '../pages/SubmarinePage.js';
import CrashPage from '../pages/CrashPage.js';
import readline from 'readline';

// Hulpfunctie om Enter af te wachten
async function waitForEnter() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  await new Promise((resolve) => rl.question('\n✅ Test voltooid. Druk op ENTER om af te sluiten...', () => {
    rl.close();
    resolve();
  }));
}

// Verhoogd timeout voor volledige gameflow
test.setTimeout(120000);

test('Hack The Future - Volledige gameflow', async ({ page }) => {
  const home = new HomePage(page);
  const character = new CharacterSelectPage(page);
  const whoami = new WhoAmIPage(page);
  const office = new OfficePage(page);
  const dockingBay = new DockingBayPage(page);
  const submarine = new SubmarinePage(page);
  const crash = new CrashPage(page);

  await home.open();
  await home.clickStart();

  await character.selectMale();
  await character.confirmYes();

  await whoami.fillForm('Daan', '21', 'Belgium');

  await office.gotoOffice();
  await office.clickLetters();
  await office.closeLetterPopup();
  await office.waitForCrystalOnFloor();
  await office.clickCrystalOnFloor();
  await office.waitForCrystalPopup();
  await office.clickBigCrystalInPopup();
  await office.waitForPopupToClose();

  await dockingBay.gotoDockingBay();
  await dockingBay.waitForRandomValuesAndSwitches();
  const randomValues = await dockingBay.readRandomValues();
  await dockingBay.setSwitches(randomValues);
  await dockingBay.waitForDropButtonActive();
  await dockingBay.clickDrop();
  await dockingBay.waitAfterDrop();
  await dockingBay.clickSubmarine();
  await dockingBay.waitForNextLevel();

  await submarine.gotoSubmarine();
  await submarine.followArrows();
  await submarine.waitForNextLevel();

  await crash.doubleClickSquare();

  // 👇 Pauze zodat het venster open blijft tot jij op Enter drukt
  await waitForEnter();
});
