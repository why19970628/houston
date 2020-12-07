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
          await pageInteractions.UserManagePageGoToTeam();
        });
        it('project lounge should contain Create project button', async () => {
          await pageExpects.expectElementToLoadByXpath('//span[contains(., "创建团队")]');
        });

        describe('开始用户管理', () => {
            beforeAll(async () => {
              await pageInteractions.createTeamFunc();
            });
            it('project lounge should contain Create project button', async () => {
              await pageExpects.expectElementToLoadByXpath('//span[contains(., "创建团队")]');
            });
            
        })
        
    })
    

});