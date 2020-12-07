const chalk = require('chalk');
const axios = require('axios');
const cheerio = require('cheerio');
const $util = require('../helper/util.js');

let secretConfig = require('../config/secret')

let $anno = {},
  $config = null,
  screenshotNameList = []

$anno.setConfig = (config) => {
  $config = config
}


// 提交
const commit = async (page) => {
  $util.printWithColor('--提交开始', type = 'success');
  await page.waitFor(2 * 1000);
  await page.waitForXPath("//div[contains(., '提交')]");
  $util.print('----附言开始');

  // const [comment_button] = await page.$x('//div[@class="flex relative"]/div[1]/button');
  const [comment_button] = await page.$x(
    '/html/body/div/div/div/footer/div[2]/div/div[2]/button',
  );
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
  $util.print('--提交成功');
};
