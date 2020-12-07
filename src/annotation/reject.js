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
    goto_project()


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
    const check_pool = await page.$x("//span[contains(., '检查池')]");
    await check_pool[0].click();
    console.log('进入项目检查池');
    await page.waitFor(5 * 1000);

    // qualify_commit()
    failed_commit()

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

    // 合格
    const qualify_commit = async () => {
        $util.print('--提交开始');
        await page.waitFor(2 * 1000)
        await page.waitForXPath("//div[contains(., '合格')]");
        $util.print('----附言开始');
        

        // const [comment_button] = await page.$x('//div[@class="flex relative"]/div[1]/button');
        const [comment_button] = await page.$x('/html/body/div[1]/div/div/footer/div[2]/div/div[2]/button');
        await comment_button.click();
        $util.print('------附言');

        await page.type('textarea', ' 合格 test !!!', {
            delay: 20,
        });
        $util.print('------附言写入');


        const [save_button] = await page.$x('//button[contains(., "保存")]');
        await save_button.click();
        $util.print('------附言保存成功');

        const [commit_button] = await page.$x('//button[contains(., "合格")]');
        await commit_button.click();
        $util.print('----提交成功');

    }



    // 驳回
    const failed_commit = async () => {
        $util.print('--驳回开始');
        await page.waitFor(2 * 1000)
        await page.waitForXPath("//div[contains(., '合格')]");
        $util.print('----驳回开始');

        // 点击驳回
        const [refuse_button] = await page.$x('/html/body/div[1]/div/div/footer/div[2]/button[2]');
        await refuse_button.click();
        $util.print('------附言');
        
    
        // const [comment_button] = await page.$x('//div[@class="flex relative"]/div[1]/button');
        const [comment_button] = await page.$x('/html/body/div[1]/div/div/footer/div[2]/div/div[2]/button');
        await comment_button.click();
        $util.print('------附言');
    
        await page.type('textarea', ' 驳回 test !!!', {
          delay: 20,
        });
        $util.print('------附言写入');
    
    
        const [save_button] = await page.$x('//button[contains(., "保存")]');
        await save_button.click();
        $util.print('------附言保存成功');
    
        // 驳回提交
        const [commit_button] = await page.$x('//button[contains(., "驳回")]');
        await commit_button.click();
        $util.print('----驳回成功');
    
      }

})();