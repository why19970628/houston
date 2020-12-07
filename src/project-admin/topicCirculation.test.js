const pageInteractions = require('../utils/pageInteractions');
const pageExpects = require('../utils/pageExpects');
const contentPageHandle = require('../utils/contentPageHandle');

// 题目流转（场景三个池子：标检抽)
// 1.标注3道题，提交到检查池，
// 2.检查池驳回1道提交2道，提到到抽检池的2题
// 3.创建抽检包，进去处理 1道合格 1道不合格，最后处理抽检包

describe('前往创建项目', () => {
  beforeAll(async () => {
    await pageInteractions.goToLoginPage();
    await pageInteractions.performLogin();
    await page.goto(`${process.env.FRONTEND_HOST}annotation/582/content`);
  });
  it('项目内容页面', async () => {
    await pageExpects.expectElementToLoadByXpath(
      '//span[contains(., "项目内容")]',
    );
  });

  describe('开始三次标注', () => {
    beforeAll(async () => {
      await contentPageHandle.GoToAnnoPage();
      await pageInteractions.annotationImageProjectHandle();

      await pageInteractions.commitImageAnnotation();
      await page.waitFor(1 * 1000)
      await pageInteractions.commitImageAnnotation();
      await page.waitFor(1 * 1000)
      await pageInteractions.commitImageAnnotation();

      // 关闭标注，回到content页面
      await pageInteractions.closeAnnotationHandle();
    });
    it('三次标注成功', async () => {
      await pageExpects.expectElementToLoadByXpath(
        '//span[contains(., "项目内容")]',
      );
    });

    describe('开始检查三道题', () => {
      beforeAll(async () => {
        await contentPageHandle.GoToCheckPage();
        await pageInteractions.refuseAnnotationHandle();
        await page.waitFor(1 * 1000)

        await pageInteractions.qualifyCommitHandle();
        await pageInteractions.qualifyCommitHandle();
        // 跳转 annotation/582/content page
        await pageInteractions.closeAnnotationCheckPageHandle();
      });
      it('返回项目内容页', async () => {
        await pageExpects.expectElementToLoadByXpath(
          '//span[contains(., "项目内容")]',
        );
      });

      describe('开始按人抽检', () => {
        beforeAll(async () => {
          await contentPageHandle.GoToSpotPage();
          // 创建2题的抽检包
          await contentPageHandle.createSpotCheckPackageByPeopleHandle();
          // 处理抽检包
          await contentPageHandle.checkSpotPackageHandle();
        });
        it('按人抽检结束,返回内容页', async () => {
          await pageExpects.expectElementToLoadByXpath(
            '//span[contains(., "项目内容")]',
          );
        });
      });
    });
  });
});
