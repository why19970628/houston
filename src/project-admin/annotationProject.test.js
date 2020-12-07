const pageInteractions = require('../utils/pageInteractions')
const pageExpects = require('../utils/pageExpects')

describe('前往创建项目', () => {
  beforeAll(async () => {
    await pageInteractions.goToLoginPage();
    await pageInteractions.performLogin();
    await page.goto(`${process.env.FRONTEND_HOST}admin/project/582/config`);
  });
  it('前往项目配置页面', async () => {
    await pageExpects.expectElementToLoadByXpath('//div[contains(., "数据集配置")]');
  });

  describe('go to image annotation page', () => {
    beforeAll(async () => {
      await pageInteractions.goToProjectAnnotation();
      await pageInteractions.goToAnnotationPool();
    });
    it('annotation page should contain correct commit button', async () => {
      await pageExpects.expectElementToLoadByXpath('//button[contains(., "提交")]');
    });


    describe('开始标注项目', () => {
      it('should work', async () => {
        await pageInteractions.annotationImageProjectHandle();
        await pageInteractions.commitImageAnnotation()
      });

      describe('close annotation page', () => {
        beforeAll(async () => {
          await pageInteractions.closeAnnotationHandle();
        });
        it('after annotation page should contain project list', async () => {
          await pageExpects.expectElementToLoadByXpath('//span[contains(., "工作大厅")]');
        });
      });

    });

  });

});