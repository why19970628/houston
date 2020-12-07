const pageInteractions = require('../utils/pageInteractions');
const pageExpects = require('../utils/pageExpects');
const projectUtils = require('../utils/createProjectUtils');
describe('项目大厅', () => {
  beforeAll(async () => {
    await pageInteractions.goToLoginPage();
    await pageInteractions.performLogin();
    await pageInteractions.goToProjectLounge();
  });

  it('project lounge should contain Create project button', async () => {
    await pageExpects.expectElementToLoadByXpath(
      '//span[contains(., "创建项目")]',
    );
  });

  // TODO: check more stuff on project lounge page

  describe('Create Project', () => {
    beforeAll(async () => {
      await pageInteractions.clickCreateProject();
    });

    it('page should contain correct inputs', async () => {
      await pageExpects.expectElementPropertyBySelector(
        '#name',
        'placeholder',
        '请输入项目名 (20字内为佳)',
      );
      await pageExpects.expectElementPropertyBySelector(
        '#accuracy',
        'placeholder',
        '请输入准确度',
      );
    });

    //TODO: check more stuff on create project page

    describe('Create image annotation project', () => {
      beforeAll(async () => {
        await pageInteractions.createImageAnnotationProject();
        // 工作流配置
        await projectUtils.workflowConfig();

        // expects elements and etc...
        await pageInteractions.addImageAnnotationProjectConfig();

        // 数据集配置
        await projectUtils.workflowDataSetConfig();
      });

      it('显示暂停', async () => {
        await page.waitForXPath("//span[contains(., '暂停项目')]");
      });
    });
  });
});
