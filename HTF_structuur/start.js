// start.js
const { chromium } = require('playwright');
const { config } = require('./config/config');
const HomePage = require('./pages/HomePage');
const CharacterSelectPage = require('./pages/CharacterSelectPage');
const WhoAmIPage = require('./pages/WhoAmIPage');
const OfficePage = require('./pages/OfficePage');
const DockingBayPage = require('./pages/DockingBayPage');
const SubmarinePage = require('./pages/SubmarinePage');

(async () => {
  const browser = await chromium.launch({
    headless: config.headless,
    slowMo: config.slowMo
  });

  const context = await browser.newContext();
  const page = await context.newPage();

try {
  const home = new HomePage(page);
  const character = new CharacterSelectPage(page);
  const whoami = new WhoAmIPage(page);
  const office = new OfficePage(page);
  const dockingBay = new DockingBayPage(page);
  const submarine = new SubmarinePage(page); // ← NIEUW

  // === TOT DOCKING BAY ===
  await home.open();
  await home.clickStart();
  await character.selectMale();
  await character.confirmYes();
  await whoami.fillForm('TestPlayer', '25', 'Belgium');
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

  // === SUBMARINE LEVEL (NIEUW) ===
  await submarine.gotoSubmarine();
  await submarine.followArrows();
  await submarine.waitForNextLevel();

  console.log('HELE SPEL TOT SUBMARINE VOLTOOID!');
  await page.waitForTimeout(5000);

}catch (err) {
    console.error('Fout opgetreden:', err.message);
    await require('./utils/helpers').saveDebug(page, 'final');
    process.exitCode = 1;
  } finally {
    // await browser.close(); // uncomment als je wil afsluiten
  }
})();