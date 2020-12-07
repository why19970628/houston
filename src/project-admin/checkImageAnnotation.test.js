const pageInteractions = require('../utils/pageInteractions');
const pageExpects = require('../utils/pageExpects');
const baseHelper = require('../utils/baseModuleHelper');
const contentPageHandle = require('../utils/contentPageHandle');

describe('前往创建项目', () => {
  beforeAll(async () => {
    await baseHelper.creataImageProject();
    // 去content页面
    await pageInteractions.getProjectId();
  });
  it('前往项目配置页面', async () => {
    await pageExpects.expectElementToLoadByXpath(
      '//div[contains(., "数据集配置")]',
    );
  });

  describe('go to image annotation page', () => {
    beforeAll(async () => {
      // await pageInteractions.goToCheckPool();
      await contentPageHandle.GoToCheckPage();
    });
    it('annotation page should contain correct commit button', async () => {
      await pageExpects.expectElementToLoadByXpath(
        '//button[contains(., "合格")]',
      );
    });

    describe('start Check image annotation', () => {
      it('should work', async () => {
        await pageInteractions.qualifyCommitHandle();
        // 跳转 annotation page
        await pageInteractions.annotaionPageToSearchHandle();
      });

      describe('go to SpotCheckPool', () => {
        beforeAll(async () => {
          await pageInteractions.goToSpotCheckPool();
        });
        it('sampling page should contain "sampling package word"', async () => {
          await pageExpects.expectElementToLoadByXpath(
            '//div[contains(., "抽检包")]',
          );
        });

        describe('start create SpotCheckPackage', () => {
          beforeAll(async () => {
            await pageInteractions.createSpotCheckPackageHandle();
          });
          it('sampling page should contain "sampling package word"', async () => {
            await pageExpects.expectElementToLoadByXpath(
              '//div[contains(., "抽检包")]',
            );
          });
          // 驳回解散抽检包
          describe('start reject and dismisss package', () => {
            beforeAll(async () => {
              await pageInteractions.rejectAndDissAnnotationHandle();
            });
            it('sampling page should contain "sampling package word"', async () => {
              await pageExpects.expectElementToLoadByXpath(
                '//div[contains(., "抽检包")]',
              );
            });
          });
        });
      });
    });
  });
});
