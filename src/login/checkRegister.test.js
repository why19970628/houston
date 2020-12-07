const pageInteractions = require('../utils/pageInteractions')
const pageExpects = require('../utils/pageExpects')
// const phoneNumber = Symbol.for('project');
const phoneNumber = "1111" + Math.random().toFixed(7).slice(-7);
describe('Register', () => {
  beforeAll(async () => {
    await pageInteractions.goToLoginPage();
    await pageInteractions.goToRegisterPage();

  });

  it('page title should be register account', async () => {
    await pageExpects.expectElementToLoadByXpath('//div[contains(., "注册账户")]');

  });


  describe('submit register username and password', () => {
    beforeAll(async () => {
      console.log(phoneNumber);
      await pageInteractions.performRegister(phoneNumber);

    });

    it('page should contain "improve information"', async () => {
      await pageExpects.expectElementToLoadByXpath('//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div');
    });

    describe('improve register information', () => {
      beforeAll(async () => {
        // https://torb.now.sh/auth/complete-profile
        await pageInteractions.improveRegisterInfo(phoneNumber);

      });

      it('after register login action should be ok', async () => {
        await pageExpects.expectElementToLoadByXpath('//button[contains(., "项目大厅")]');
      });

    });

  });
});