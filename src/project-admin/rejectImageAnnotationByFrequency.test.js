const pageInteractions = require('../utils/pageInteractions');
const pageExpects = require('../utils/pageExpects');
const annoExpects = require('../utils/pageInteractions');

describe('按驳回次数抽检', () => {
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

  describe('开始标注项目', () => {
    beforeAll(async () => {
      await annoExpects.contentPageGoToAnnoPage();
      await pageInteractions.annotationImageProjectHandle();
    });
    it('标注完成,回到项目annotation content页面', async () => {
      await pageExpects.expectElementToLoadByXpath(
        '//span[contains(., "项目内容")]',
      );
    });

    describe('开始检查', () => {
      beforeAll(async () => {
        // 进入检查池
        await annoExpects.contentPageGoToCheckoPage();
        // 检查后返回content
        await pageInteractions.qualifyCommitHandle();
      });
      it('should has word "开始抽检"', async () => {
        await pageExpects.expectElementToLoadByXpath(
          '//div[contains(., "开始抽检")]',
        );
      });

      describe('开始抽检', () => {
        beforeAll(async () => {
          await pageInteractions.goToSpotCheckPool();
        });
        it('sampling page should contain "sampling package word"', async () => {
          await pageExpects.expectElementToLoadByXpath(
            '//div[contains(., "抽检包")]',
          );
        });

        describe('创建抽检包', () => {
          beforeAll(async () => {
            await pageInteractions.createSpotCheckPackageHandle();
          });
          it('sampling page should contain "sampling package word"', async () => {
            await pageExpects.expectElementToLoadByXpath(
              '//div[contains(., "抽检包")]',
            );
          });
          // 驳回解散抽检包
          describe('驳回解散抽检包', () => {
            beforeAll(async () => {
              await pageInteractions.rejectAnnotationHandle();
            });
            it('当前为抽检页面', async () => {
              await pageExpects.expectElementToLoadByXpath(
                '//span[contains(., "抽检包")]',
              );
            });
            describe('start reject and dismisss package', () => {
              beforeAll(async () => {
                await pageInteractions.samplingPageBackToContentHandle();
                // 按驳回次数抽检

                // 进入检查池
                await annoExpects.contentPageGoToCheckoPage();
                // 检查后返回content
                await pageInteractions.qualifyCommitHandle();
              });
              it('当前为抽检页面', async () => {
                await pageExpects.expectElementToLoadByXpath(
                  '//span[contains(., "抽检包")]',
                );
              });
            });
          });
        });
      });
    });
  });
});
