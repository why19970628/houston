// annotation/id/content 内容页

const secretConfig = require('../config/secret');
const PROJECT_ID = Symbol.for('project');

module.exports = {
  goToLoginPage: async () => {
    await module.exports.setInitLanguageToChinese();
    await page.goto(`${process.env.FRONTEND_HOST}auth/login`);
  },

  GoToAnnoPage: async () => {
    contentPageGoToAnnoPageButton = await page.waitForXPath(
      '//span[contains(., "开始做题")]',
    );
    await Promise.all([
      page.waitForNavigation(),
      contentPageGoToAnnoPageButton.click(),
    ]);
  },

  GoToCheckPage: async () => {
    contentPageGoToCheckoPageButton = await page.waitForXPath(
      '//span[contains(., "开始检查")]',
    );
    await contentPageGoToCheckoPageButton.click();


    page.waitFor(2 * 1000)
    continuePageButton = page.waitForXPath(
      '//span[contains(., "继续吧")]',
    );
    if (continuePageButton){
      await Promise.all([
        page.waitForNavigation(),
        continuePageButton.click(),
      ]);
    }

    // await Promise.all([
    //   page.waitForNavigation(),
    //   contentPageGoToCheckoPageButton.click(),
    // ]);
  },
  GoToSpotPage: async () => {
    contentPageGoToCheckoPageButton = await page.waitForXPath(
      '//span[contains(., "开始抽检")]',
    );
    await Promise.all([
      page.waitForNavigation(),
      contentPageGoToCheckoPageButton.click(),
    ]);
  },

  samplingPageBackToContentHandle: async () => {
    samplingPageBackToContentButton = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[2]/div[1]/div/span[2]/span[1]/a',
    );
    await Promise.all([
      page.waitForNavigation(),
      samplingPageBackToContentButton.click(),
    ]);
  },

  loginOut: async () => {
    accountButton = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[1]/div/div[2]/button/div',
    );
    // await accountButton.click();
    await accountButton.hover();

    await page.waitFor(500);
    loginOutButton = await page.waitForXPath('//li[contains(., "登出")]');
    await Promise.all([page.waitForNavigation(), loginOutButton.click()]);
  },

  gotoLoginPage: async () => {
    await page.goto('https://torb.now.sh/auth/login');
  },
  // 创建抽检包
  createSpotCheckPackageByPeopleHandle: async () => {
    create_spot_check_button = await page.waitForXPath(
      '//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div/div/div/div/table/tbody/tr[1]/td[10]/div/button[4]',
    );
    await create_spot_check_button.click();
    await page.waitFor(500);

    // 按人抽检
    team_button = await page.waitForXPath(
      '//html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[5]/div[2]/div/div/div/div/div[2]/div/div/div/span[1]/span',
    );
    await team_button.click();
    await page.waitFor(500);

    user_button = await page.waitForXPath(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[5]/div[2]/div/div/div/div/div[2]/div/div/div[2]/span[2]/span',
    );
    await user_button.click();
    await page.waitFor(500);

    // cancel_button = await page.waitForXPath(
    //   '/html/body/div[3]/div/div[2]/div/div[2]/div[2]/form/div[5]/div[2]/div/div/div/div/div[2]/div/div/div[3]/span[3]/span'
    // );
    // await cancel_button.click();

    // 抽检包创建
    spot_check_commit_button = await page.waitForXPath(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[3]/button[2]',
    );
    spot_check_commit_button.click();
  },

  // 创建抽检包
  createSpotCheckPackageByPeopleHandle: async () => {
    create_spot_check_button = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[2]/div[2]/div[1]/div[2]/button',
    );
    await create_spot_check_button.click();
    await page.waitFor(500);

    // 按人抽检
    // team_button = await page.waitForXPath(
    //   '//html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[5]/div[2]/div/div/div/div/div[2]/div/div/div/span[1]/span',
    // );
    // await team_button.click();
    // await page.waitFor(500);

    // user_button = await page.waitForXPath(
    //   '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[5]/div[2]/div/div/div/div/div[2]/div/div/div[2]/span[2]/span',
    // );
    // await user_button.click();
    // await page.waitFor(500);

    // 抽检包创建
    spot_check_commit_button = await page.waitForXPath('/html/body/div[3]/div/div[2]/div/div[2]/div[3]/button[2]');
    spot_check_commit_button.click();
  },

  // 抽检页返回
  spotBackContentHandle: async () => {
    backButton = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[2]/div[1]/div/span[2]/span[1]',
    );
    await Promise.all([page.waitForNavigation(), backButton.click()]);
  },
  commitImageAnnotation: async () => {
    comment_button = await page.waitForXPath(
      '/html/body/div/div/div/footer/div[2]/div/div[2]/button',
    );
    await comment_button.click();

    await page.type('textarea', ' this is test !!!', {
      delay: 20,
    });

    save_button = await page.waitForXPath(
      '//*[@id="root"]/div/div/footer/div[2]/div/div[1]/div[2]/div[2]/button',
    );
    await save_button.click();

    commit_button = await page.waitForXPath('//button[contains(., "提交")]');
    await Promise.all([commit_button.click(), page.waitForNavigation()]);
  },

  checkSpotPackageHandle: async () => {
    start_check_button = page.waitForXPath("//button[contains(., '开始检测')]");
    await start_check_button.click();

    await page.waitFor(500);
    continue_check_button = page.waitForXPath("//button[contains(., '继续吧')]");
    if (continue_check_button) {
      await continue_check_button.click();
    }

    unqualified_button = page.waitForXPath("//button[contains(., '不合格')]");
    await unqualified_button.click();


    refuse_button = await page.waitForXPath('//button[contains(., "驳回")]');
    await refuse_button.click();

    commit_button = await page.waitForXPath('//button[contains(., "合格")]');
    await Promise.all([commit_button.click(), page.waitForNavigation()]);
  },
};
