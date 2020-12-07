const puppeteer = require('puppeteer');
const $util = require('../helper/util.js');
const secretConfig = require('../config/secret');
const config = require('../config/config');
const PROJECT_ID = Symbol.for('project');
const path = require('path');

const chalk = require('chalk');

(async () => {
  console.log('starting');
  const browser = await puppeteer.launch(config.DefaultBrowserConfig);

  // let page;
  // const page = await global.__BROWSER__.newPage();
  const page = await browser.newPage();
  $util.hello(page);

  await page.goto('https://torb.now.sh/auth/login');

  // }

  // https://www.checklyhq.com/docs/browser-checks/login-scenarios/
  page.waitForXPath("//span[contains(., '登录')]").then(() => {
    startLogin();
  });

  // Login
  const startLogin = async () => {
    console.log(chalk.green('Okoy, Start Login!'));

    await page.type('input[type="text"]', secretConfig.stardust.account, {
      delay: 20,
    });
    await page.type('input[type="password"]', secretConfig.stardust.password, {
      delay: 20,
    });
    await page.keyboard.press('Enter');
    await page.waitFor(2 * 1000);

    console.log(chalk.green('Congratulations, Has successfully checked in.'));
    // goto_project()
    // await page.goto('https://torb.now.sh/taskRuns/49213').catch(error => {});
    // check_project();

    // label : 拉框
    goto_project();

    // test
    // await page
    //   .goto('https://torb.now.sh/annotation/273/sampling/933')
    //   .catch(error => {});

    // 驳回抽检包
    // reject_task();ccccccccccccccccccccccccccccccccc
    // dismiss_check();
  };

  // 跳转标注页面
  const goto_project = async () => {
    // 点击项目大厅
    click_project_hall();
    console.log('进入项目大厅');

    await page.waitFor(5 * 1000);
    // 点击标注工作
    const [button] = await page.$x("//a[contains(., '标注工作')]");
    await button.click();
    console.log('点击标注工作成功');

    // 搜索
    await page.waitFor(5 * 1000);
    search_project_by_id();
    console.log('搜索项目成功');

    page.waitForXPath("//span[contains(., '标注池')]");
    await page.waitFor(1 * 1000);
    const spot_check_pool = await page.$x("//span[contains(., '抽检池')]");
    await spot_check_pool[0].click();
    console.log('进入项目抽检池');
    await page.waitFor(3 * 1000);

    // qualify_commit()
    // create_spot_check();
    await page
      .goto('https://torb.now.sh/annotation/273/sampling/933')
      .catch(error => {});
    await page.waitFor(2 * 1000);

    // 创建抽检包
    create_spot_check();
  };

  // 登录后跳转项目大厅
  const click_project_hall = async () => {
    const [button] = await page.$x("//button[contains(., '项目大厅')]");
    if (button) {
      await button.click();
    } else {
      console.log(chalk.redBright('error 未找到项目大厅button, 通过链接跳转'));
      await page.goto('https://torb.now.sh/admin/project').catch(error => {});
    }
  };

  // 搜索
  const search_project_by_id = async () => {
    await page.type('input[type="text"]', '273', { delay: 20 });
    await page.keyboard.press('Enter');
  };

  // 创建抽检包
  const create_spot_check = async () => {
    $util.print('--创建抽检包');
    await page.waitFor(2 * 1000);

    const [create_spot_check_button] = await page.$x(
      '/html/body/div/div/div/div[2]/div[2]/div[1]/div[2]/button',
    );
    await create_spot_check_button.click();
    $util.print('------创建抽检');

    await page.waitFor(3 * 1000);

    // 选择题目
    // const [choose_button] = await page.$x("//button[contains(., '项目大厅')]");
    const [choose_button] = await page.$x(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[5]/div[2]/div/div/div/div/div[2]/div/div/div/span[2]/span',
    );
    await choose_button.click();
    $util.print('----选择题目完成');

    await page.waitFor(1 * 1000);

    //清空输入框的值
    // await page.$eval('#samplingCount',input => input.value='' );
    // await page.$eval('#samplingCount',input => input.value='2' );

    // 焦点设置到
    await page.focus('[id="samplingCount"]');
    // 将文本键入焦点元素
    await page.keyboard.type('1', { delay: 100 });
    $util.print('----样本数完成');

    // 创建抽检包
    const [create_button] = await page.$x(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[3]/button[2]',
    );
    await create_button.click();
    $util.print('--创建抽检包成功');

    // 驳回抽检包
    reject_task();
  };

  // 抽检包驳回
  const reject_task = async () => {
    await page.waitFor(2 * 1000);
    const [reject_check_button] = await page.$x("//span[contains(., '驳 回')]");
    await reject_check_button.click();

    await page.waitFor(2 * 1000);

    // 合格的题
    const [qualified_questions] = await page.$x(
      '//*[@id="operationForPassedTaskRuns"]',
    );
    await qualified_questions.click();
    $util.print('----合格的题点击');

    // 合格的题 通过
    const [qualified_questions_pass] = await page.$x(
      "//div[contains(., '通过')]",
    );
    await qualified_questions_pass.click();

    // 标错题驳回到 点击

    const [error_questions_to] = await page.$x(
      '//*[@id="operationForRejectedTaskRuns"]',
    );
    await error_questions_to.click();

    // 标错题驳回到 第一个选择
    const [error_questions_to_first] = await page.$x(
      "//div[contains(., '驳回到上一个工作池 (原操作员)')]",
    );
    await error_questions_to_first.click();

    // 驳回确认
    const [reject_sure_button] = await page.$x("//span[contains(., '确 定')]");
    await reject_sure_button.click();

    $util.print('--抽检包驳回成功');

    dismiss_check();
  };

  // 解散按钮
  const dismiss_check = async () => {
    // 解散按钮
    console.log('--抽检包解散');
    await page.waitForXPath("//span[contains(., '解 散')]");
    const [dissmiss_button] = await page.$x("//span[contains(., '解 散')]");
    await dissmiss_button.click();

    // 合格的题
    const [qualified_questions] = await page.$x(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[2]/div[2]/div[1]/div/div/div/span[1]/input',
    );
    await qualified_questions.click();
    $util.print('----合格的题点击');

    // 合格的题 通过
    const [qualified_questions_pass] = await page.$x(
      '/html/body/div[3]/div/div/div/div[2]/div/div/div[1]/div',
    );
    await qualified_questions_pass.click();

    // 标错题驳回到

    const [error_questions_to] = await page.$x(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[3]/div[2]/div[1]/div/div/div/span[1]/input',
    );
    await error_questions_to.click();

    // 标错题驳回到 第一个
    const [error_questions_to_first] = await page.$x(
      '/html/body/div[4]/div/div/div/div[2]/div/div/div[1]/div',
    );
    await error_questions_to_first.click();

    // 标错题驳回到 第一个
    const [dismiss_check_sure_button] = await page.$x(
      "//span[contains(., '确 定')]",
    );
    await dismiss_check_sure_button.click();

    $util.print('--抽检包解散成功');
  };

  // 通过按钮
  const pass_check = async () => {
    // 开始检测
    console.log('--抽检包 点击=>开始检测 ');
    await page.waitForXPath("//span[contains(., '解 散')]");
    const [start_check_button] = await page.$x(
      "//span[contains(., '开始检测')]",
    );
    await start_check_button.click();

    

    // 合格按钮点击
    await page.waitForXPath("//div[contains(., '合格')]");
    const [qualified_button] = await page.$x(
      '//*[@id="root"]/div/div/footer/div[2]/button[2]');
    while (document.querySelector(qualified_button)) {
      await qualified_button.click();
      $util.print('----合格 => 持续点击');
      await page.waitFor(2* 1000);
    };
    // await qualified_button.click();
    $util.print('----合格点击结束');

  };
})();
