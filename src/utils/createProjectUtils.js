module.exports = {
  goToLoginPage: async () => {
    await module.exports.setInitLanguageToChinese();
    await page.goto(`${process.env.FRONTEND_HOST}auth/login`);
  },

  goToRegisterPage: async () => {
    clickRegisterButton = await page.waitForXPath(
      '//a[contains(., "立即注册")]',
    );
    await Promise.all([page.waitForNavigation(), clickRegisterButton.click()]);
  },

  workflowConfig: async () => {
    await page.waitForXPath('//span[contains(., "详细配置")]');
    workflowConfigButton = await page.$x('//button[contains(., "配置")]');
    await Promise.all([
      page.waitForNavigation(),
      workflowConfigButton[0].click(),
    ]);

    // 标注池
    await page.waitFor(1 * 1000);

    workflowAnnotationPoolButton = await page.waitForXPath(
      '/html/body/div/div/div/div[2]/div[2]/div/div[1]/div[2]/div[2]/button[2]',
    );
    await workflowAnnotationPoolButton.click();
    await page.mouse.click(500, 300);

    // 检查池
    workflowCheckPoolButton = await page.waitForXPath(
      '/html/body/div/div/div/div[2]/div[2]/div/div[1]/div[2]/div[2]/button[4]',
    );
    await workflowCheckPoolButton.click();
    await page.mouse.click(600, 500);

    // 抽检池
    workflowSpotCheckPoolButton = await page.waitForXPath(
      '/html/body/div/div/div/div[2]/div[2]/div/div[1]/div[2]/div[2]/button[5]',
    );
    await workflowSpotCheckPoolButton.click();
    await page.mouse.click(500, 700);

     // 完成池
     workflowCompletePoolButton = await page.waitForXPath(
      '/html/body/div/div/div/div[2]/div[2]/div/div[1]/div[2]/div[2]/button[6]',
    );
    await workflowCompletePoolButton.click();
    await page.mouse.click(400, 550);

    // 起点=>标注池
    await page.mouse.click(300, 400);
    workflowStartButton = await page.waitForXPath(
      '/html/body/div/div/div/div[2]/div[2]/div/div[1]/div[2]/div[2]/button[2]',
    );
    await workflowStartButton.click();

    workflowStartTopButton = await page.waitForXPath(
      '/html/body/div/div/div/div[2]/div[2]/div/div[1]/div[1]/div/div[1]/div[4]',
    );
    await workflowStartTopButton.click();

    await page.mouse.move(500, 300);
    await page.mouse.down();

    // 标注池=>检查池
    await page.mouse.click(500, 300);
    workflowStartBottomButton = await page.waitForXPath(
      '/html/body/div/div/div/div[2]/div[2]/div/div[1]/div[1]/div/div[3]/div[5]',
    );
    await workflowStartBottomButton.click();

    await page.mouse.move(600, 500);
    await page.mouse.down();

    // 检查池=>抽检池
    await page.mouse.click(600, 500);
    workflowSpotTopButton = await page.waitForSelector('#root > div > div > div.page-container > div.w-full.flex.flex-col.flex-1 > div > div.flex-1 > div.bg-canvas-dark.w-full.h-full > div > div:nth-child(5) > div.workflow-node-knob.left');
    await workflowSpotTopButton.click();
    await page.mouse.move(500, 700);
    await page.mouse.down();



    // 抽检池=>完成池
    await page.mouse.click(500, 700);
    workflowCompeleteTopButton = await page.waitForSelector('#root > div > div > div.page-container > div.w-full.flex.flex-col.flex-1 > div > div.flex-1 > div.bg-canvas-dark.w-full.h-full > div > div:nth-child(7) > div.workflow-node-knob.left');
    await workflowCompeleteTopButton.click();
    await page.mouse.move(400, 550);
    await page.mouse.down();
    await page.mouse.click(400, 550);

    await page.waitFor(1 * 1000);

    clickcommitButton = await page.waitForXPath('/html/body/div/div/div/div[2]/div[1]/div[2]/button');
    await Promise.all([page.waitForNavigation(), clickcommitButton.click()]);
  },

  workflowDataSetConfig: async () => {

  addDatasetFileButton = await page.waitForXPath('/html/body/div[1]/div/div/div[3]/div/div[1]/div[2]/div[1]/div[2]/button');
  await addDatasetFileButton.hover();


  addJsonlFileButton = await page.waitForXPath('/html/body/div[2]/div/div/ul/li[2]/span/div/span/input');
  await addJsonlFileButton.uploadFile('src/data/images_dataset.jsonl');


  SureAddJsonlFileButton = await page.waitForXPath('//span[contains(., "知道了")]');

  // SureAddJsonlFileButton = await page.waitForXPath('/html/body/div[4]/div/div[2]/div/div[2]/div/div/div[2]/button');
  await SureAddJsonlFileButton.click();

  await page.waitFor( 2 * 1000);


  startProjectButton1 = await page.waitForXPath('//span[contains(., "启动项目")]');
  await startProjectButton1.click();

  // startProjectButton = await page.waitForXPath('/html/body/div[1]/div/div/div[2]/div/div[3]/div/button[1]');
  // await startProjectButton.click();


  },
};
