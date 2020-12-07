const puppeteer = require('puppeteer');
const $util = require('../utils/util.js');
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

  // try {
  //   const waitNavigationPromise = page.waitForNavigation({timeout: 10000, waitUntil: "load"});

  //   await waitNavigationPromise;

  //   return await page;
  // }
  // catch(e) {
  //     this.catchError(e, page);

  //     return false;
  // }

  // https://www.checklyhq.com/docs/browser-checks/login-scenarios/
  page.waitForXPath("//span[contains(., '登录')]").then(() => {
    startLogin();

    // click_project_hall()
    // create_project() // 点击创建项目
    // wait_for_create_project()
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


     // 点击项目大厅
     click_project_hall();
     console.log('进入项目大厅');


    // await page.goto('https://torb.now.sh/taskRuns/49213').catch(error => {});
    // check_project();

    // label : 拉框 
    // check_project_label();
    


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

     // 创建项目
    create_project()
  };

  // 点击创建项目
  const create_project = async () => {
    await page.waitFor(5 * 1000);
    const [button] = await page.$x("//span[contains(., '创建项目')]");
    if (button) {
      await button.click();
    } else {
      console.log(chalk.redBright('error 标注大厅页面未找到创建项目 button'));
    }

    // 创建项目流程
    await page.type('input[type="text"]', 'puppeteer_test_project');
    await page.type('input[type="number"]', '5');
    const [Precision] = await page.$x("//label[contains(., 'Precision')]");
    if (Precision) {
      await Precision.click();
    }


    
    // 获取当前project_id
    get_project_link();

    const [project_type] = await page.$x("//span[contains(., '图像标注')]");
    if (project_type) {
      await project_type.click();
    }
    await page.keyboard.press('Enter');


    // 检验 跳转项目页面
    // check_create_project()


    // 等待项目创建成功
    // set a timeout of 8 minutes
    await page.waitForXPath("//span[contains(., '暂停项目')]",{timeout: 480000});

    // const [start_project_button] = await page.$x('/html/body/div/div/div/div[2]/div/div[3]/div/button[1]');
    // await Promise.all([
    //   start_project_button.click(),
    //   page.waitForNavigation()
    // ])
  
    console.log(chalk.green('启动项目成功'));

    // 前往该项目
    goto_project()

  };

  const get_project_link = async () => {
    await $util.waitForReadyStateComplete(page);
    // 获取创建完项目后的任务列表链接
    let taskRunList_Xpath = await page.$x(
      '//*[@id="root"]/div/div/div[2]/div/div[2]/a[3]/@href',
    );
    let project_link = await page.evaluate(
      el => el.textContent,
      taskRunList_Xpath[0],
    );

    priject_task_run_link = secretConfig.stardust.dev_link + project_link;
    project_id = project_link
      .replace('admin/project/', '')
      .replace('/task-run-list', '')
      .replace('/', '');
    console.log(project_id);
    global[PROJECT_ID] = project_id;
    console.log('正在创建项目', global[PROJECT_ID],'----',priject_task_run_link);
    // await page.goto(priject_task_run_link).catch(error => {});
  };



  // 跳转标注页面
  const goto_project = async () => {

    await page.waitFor(5 * 1000);
    // 点击标注工作
    const [button] = await page.$x("//a[contains(., '标注工作')]");
    await button.click();
    console.log('点击标注工作成功');

    // 搜索
    await page.waitFor(5 * 1000);
    search_project_by_id();
    console.log('搜索项目成功');

    // const elements = await page.$x('//div[@class="cursor-pointer"]/span[0]/button/span')
    // await elements[0].click()
    // console.log('进入标注项目')

    page.waitForXPath("//span[contains(., '标注池')]");
    await page.waitFor(1 * 1000);
    const annotation_pool = await page.$x("//span[contains(., '标注池')]");
    await annotation_pool[0].click();

    await page.waitFor(2 * 1000);
    const [continue_to_annotation] = await page.$x("//span[contains(., '继续吧')]");
    if (continue_to_annotation) {
      await continue_to_annotation.click();
    }



    console.log('进入项目标注池');

    await page.waitFor(5 * 1000);


    check_project_label();

    // await page.goto('https://torb.now.sh/annotation/273/content');
    // 页面刷新必须要等待
    // await page.waitFor(5 * 1000);
    // await page.waitForSelector('#root > div > div > div.page-container > div.bg-white.border-gray-400.rounded.border.overflow-hidden > div:nth-child(3) > div:nth-child(1) > div.flex-1.flex.items-center > div.ml-2 > div.text-indigo-600.font-medium.text-xl');

    // 查看持有
    // const [cat_hold_button] = await page.$x('//*[@id="root"]/div/div/div[2]/div[2]/div[3]/div[1]/div[2]/button[1]/span');
    // await cat_hold_button.click();

    // const [cat_hold_button_stop] = await page.$x('/html/body/div[2]/div/div[2]/div/div[2]/button/span/span');
    // await cat_hold_button_stop.click();

    console.log('检验开始做题');

    // btn = page.waitForSelector('#root > div > div > div.page-container > div.bg-white.border-gray-400.rounded.border.overflow-hidden > div:nth-child(3) > div:nth-child(1) > div.flex-2.flex.justify-end > button.ant-btn.w-32.ant-btn-primary')
    // console.log(btn)
    // page.click(btn); //With class attribute
    // await page.click('button.ant-btn w-32 ant-btn-primary');

    // const [continue_to_annotation] = await page.$x("//span[contains(., '继续吧')]");
    // if (continue_to_annotation) {
    //   await continue_to_annotation.click();
    // }
  };

    // 搜索
    const search_project_by_id = async () => {
      await page.type('input[type="text"]', global[PROJECT_ID], { delay: 20 });
      await page.keyboard.press('Enter');
    };
  // 等待项目创建完成,检验项目
  const check_project_more_action = async () => {
    await page.waitFor(2 * 1000);

    console.log('开始测试更多');
    const [more_action] = await page.$x(
      '//*[@id="root"]/div/div/footer/div[1]/div[1]/div/div',
    );
    if (more_action) {
      await more_action.click();
    } else {
      console.log(chalk.redBright('error 未找到 标注工作 更多 button'));
    }

    console.log('--复原');
    const [recover_action] = await page.$x("//li[contains(., '复原')]");
    await recover_action.click();

    await page.waitFor(3 * 1000);
    // await page.waitForXPath("//span[contains(., '确 认')]");
    const [recover_sure_button] = await page.$x('/html/body/div[4]/div/div[2]/div/div[2]/div/div/div[2]/button[2]');
    await recover_sure_button.click();
    await page.keyboard.press('Enter');
    $util.print('----复原成功');

    // await iframe.waitFor（'.contain .item'） //在<iframe>中等待'.contain .item'的节点出现，阻塞结束（ps:优先使用，有时200ms我是等不起的）
    // await page.waitFor（200）//页面等待200ms

    //   await page.waitForXPath('//a');
    //   console.log(page.url)
  };

  // banner and annotation
  const check_project_label = async () => {
    // 选择
    await page.waitForXPath("//div[contains(., '提交')]", {timeout: 480000});

     // 快捷键
     console.log('--快捷键');
     const [shortcutKey_button] = await page.$x('/html/body/div[1]/div/div/header/div/div[7]/div[2]/button');
     await shortcutKey_button.click();
     await page.waitFor(2 * 1000)
 
     const [shortcutKey_close_button] = await page.$x('//span[contains(., 关闭)]');
     await shortcutKey_close_button.click();
     $util.printWithColor("--快捷键结束", 'success')
     await page.waitFor(2 * 1000)

    // 历史记录
    console.log('--历史记录');
    const [history_button] = await page.$x('/html/body/div/div/div/header/div/div[3]/div[3]/button');
    await history_button.click();
    await page.waitFor(2 * 1000)

    const [close_button] = await page.$x('//span[contains(., 关闭)]');
    await close_button.click();
    $util.printWithColor("--历史记录结束", 'success')
    await page.waitFor(2 * 1000)

    
    
    console.log('--拉框');
    // 拉框选项
    const [pull_frame_action] = await page.$x('//*[@id="root"]/div/div/div/div[1]/div[2]/div[2]/button[2]');
    await pull_frame_action.click();

    // 将鼠标从一个点上拖动
    page.waitFor(1 * 1000)
    await page.mouse.move(50, 100);
    await page.mouse.down();

    // 将鼠标放到另一个点
    await page.mouse.move(400, 530, {steps:200}); // 鼠标移动
    await page.mouse.up();
    $util.print('--拉框结束');
  

    // 测试 '更多' 选项
    // check_project_more_action()

     // 提交
     commit();

  };


    // 提交
  const commit = async () => {
    $util.print('--提交开始');
    await page.waitFor(2 * 1000)
    await page.waitForXPath("//div[contains(., '提交')]");
    $util.print('----附言开始');
    

    // const [comment_button] = await page.$x('//div[@class="flex relative"]/div[1]/button');
    const [comment_button] = await page.$x('/html/body/div/div/div/footer/div[2]/div/div[2]/button');
    await comment_button.click();
    $util.print('------附言');

    await page.type('textarea', ' this is test !!!', {
      delay: 20,
    });
    $util.print('------附言写入');


    const [save_button] = await page.$x('//button[contains(., "保存")]');
    await save_button.click();
    $util.print('------附言保存成功');

    const [commit_button] = await page.$x('//button[contains(., "提交")]');
    await commit_button.click();
    $util.print('----提交成功');

  }
  



  // 等待项目创建完成,检验项目
  const wait_for_create_project = async () => {
    await page.goto('https://torb.now.sh/annotation').catch(error => {});
    await $util.waitForReadyStateComplete(page);
    // await iframe.waitFor（'.contain .item'） //在<iframe>中等待'.contain .item'的节点出现，阻塞结束（ps:优先使用，有时200ms我是等不起的）
    // await page.waitFor（200）//页面等待200ms

    //   await page.waitForXPath('//a');
    //   console.log(page.url)
  };
})();
