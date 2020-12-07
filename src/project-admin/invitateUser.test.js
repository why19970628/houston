const pageInteractions = require('../utils/pageInteractions')
const pageExpects = require('../utils/pageExpects')

describe('项目大厅', () => {
    beforeAll(async () => {
      await pageInteractions.goToLoginPage();
      await pageInteractions.performLogin();
      await pageInteractions.goToProjectLounge();
    });
  
    it('project lounge should contain Create project button', async () => {
      await pageExpects.expectElementToLoadByXpath('//span[contains(., "创建项目")]');
    });

    describe('项目大厅', () => {
        beforeAll(async () => {
          await pageInteractions.adminGoToUserManagePage();
        });
        it('project lounge should contain Create project button', async () => {
          await pageExpects.expectElementToLoadByXpath('//span[contains(., "邀请用户")]');
        });

        describe('开始邀请用户', () => {
            beforeAll(async () => {
              await pageInteractions.invitateUserFunc();
            });
            it('project lounge should contain Create project button', async () => {
              await pageExpects.expectElementToLoadByXpath('//span[contains(., "邀请用户")]');
            });
            
        })
        
    })
    

});