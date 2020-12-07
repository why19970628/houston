const pageInteractions = require('../utils/pageInteractions');
const pageExpects = require('../utils/pageExpects');
const contentPageHandle = require('../utils/contentPageHandle');
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

  describe('标注池', () => {
    beforeAll(async () => {
      await contentPageHandle.GoToAnnoPage();
      await pageInteractions.annotationImageProjectHandle();
      await pageInteractions.commitImageAnnotation();
      // 关闭标注，回到content页面
      await pageInteractions.closeAnnotationHandle();
    });
    it('回到content页面', async () => {
      await pageExpects.expectElementToLoadByXpath(
        '//span[contains(., "项目内容")]',
      );
    });

    describe('检查池', () => {
      beforeAll(async () => {
        await contentPageHandle.GoToCheckPage();
        await pageInteractions.qualifyCommitHandle();
        // 跳转 annotation/582/content page
        await pageInteractions.closeAnnotationHandle();
      });
      it('should work', async () => {
        await pageExpects.expectElementToLoadByXpath(
          '//span[contains(., "项目内容")]',
        );
      });

      describe('登出', () => {
        beforeAll(async () => {
          // 登出
          await page.goto(`${process.env.FRONTEND_HOST}auth/login`);
          await pageInteractions.performLogin('11112345678', '123456');
          await page.goto(`${process.env.FRONTEND_HOST}annotation/582/content`);
        });
        it('重新登录成功', async () => {
          await pageExpects.expectElementToLoadByXpath(
            '//span[contains(., "项目内容")]',
          );
        });

        describe('开始按人抽检', () => {
          beforeAll(async () => {
            await page.goto(`${process.env.FRONTEND_HOST}annotation/582/content`);

            await contentPageHandle.GoToSpotPage();
            await contentPageHandle.createSpotCheckPackageByPeopleHandle();
            // 跳转 annotation page
            await contentPageHandle.spotBackContentHandle();
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
});
