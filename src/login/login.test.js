const pageInteractions = require('../utils/pageInteractions')
const pageExpects= require('../utils/pageExpects')

describe('Login', () => {
  beforeAll(async () => {
    await pageInteractions.goToLoginPage();
  });

  it('page title should be titled "Stardust"', async () => {
    await expect(page.title()).resolves.toMatch('Stardust');
  });

  describe('Enter username and password', () => {
    it('page should contain username and password input', async () => {
      await pageExpects.expectElementPropertyBySelector('#phone', 'placeholder', '电话');
      await pageExpects.expectElementPropertyBySelector('#password', 'placeholder', '密码');
    });

    it('login action should be ok', async () => {
      await pageInteractions.performLogin();
      await pageExpects.expectElementToLoadByXpath('//button[contains(., "项目大厅")]');
    });
  });
});