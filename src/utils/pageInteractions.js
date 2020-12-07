const secretConfig = require('../config/secret');
const PROJECT_ID = Symbol.for('project');
const fs = require('fs');
const { URL } = require('url');

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

  setInitLanguageToChinese: async () => {
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'language', {
        get: function () {
          return ['zh-CN'];
        },
      });
      Object.defineProperty(navigator, 'languages', {
        get: function () {
          return ['zh-CN', 'zh'];
        },
      });
    });
  },

  selectLanguage: async locale => {
    langSelectorHandle = await page.waitForSelector('.login-lng');
    await langSelectorHandle.click();
    chineseLangOptionHandle = await page.waitForXPath(
      `/html/body/div[2]/div/div/div/div[2]/div/div/div[${
        locale === '中文' ? 1 : 2
      }]/div`,
    );
    await Promise.all([
      page.waitFor(2 * 1000),
      // page.waitForNavigation(),
      chineseLangOptionHandle.click(),
    ]);
  },

  performRegister: async phoneNumber => {
    submitButtonHandle = await page.waitForXPath('//button[@type="submit"]');
    phoneInputHandle = await page.waitForSelector('#phone');
    smsCodeInputHandle = await page.waitForSelector('#smsCode');
    passwordInputHandle = await page.waitForSelector('#password');
    sendSmsCodeHandle = await page.waitForXPath(
      '//button[contains(., "发送验证码")]',
    );
    agreedRuleHandle = await page.waitForSelector('#agreed');

    await phoneInputHandle.type(phoneNumber);
    await sendSmsCodeHandle.click();
    await smsCodeInputHandle.type('1111');
    await passwordInputHandle.type('admin');
    await agreedRuleHandle.click();
    await Promise.all([page.waitForNavigation(), submitButtonHandle.click()]);
    await page.reload();
  },

  // complete-profile
  improveRegisterInfo: async phoneNumber => {
    submitButtonHandle = await page.waitForXPath('//button[@type="submit"]');
    nameInputHandle = await page.waitForSelector('#name');
    sexChooseHandle = await page.waitForXPath(
      '/html/body/div/div/div/div[2]/div[2]/div[2]/form/div[2]/div/div/div/div/label[1]/span[1]/input',
    );
    emailInputHandle = await page.waitForSelector('#email');
    qqHandle = await page.waitForSelector('#qq');

    await nameInputHandle.type('e2e test');
    await sexChooseHandle.click();
    await emailInputHandle.type(phoneNumber + '@gmail.com');
    await qqHandle.type(phoneNumber);
    await Promise.all([page.waitForNavigation(), submitButtonHandle.click()]);
  },

  goToProjectLounge: async () => {
    await page.goto(`${process.env.FRONTEND_HOST}admin/project`);
  },

  performLogin: async (account, password) => {
    submitButtonHandle = await page.waitForXPath('//button[@type="submit"]');
    phoneInputHandle = await page.waitForSelector('#phone');
    passwordInputHandle = await page.waitForSelector('#password');

    if (typeof account == 'undefined') {
      account = secretConfig.stardust.account;
      password = secretConfig.stardust.password;
    }

    await phoneInputHandle.type(account);
    await passwordInputHandle.type(password);
    await Promise.all([page.waitForNavigation(), submitButtonHandle.click()]);
  },

  clickCreateProject: async () => {
    createProjectButtonHandle = await page.waitForXPath(
      '//span[contains(., "创建项目")]',
    );
    await Promise.all([
      page.waitForNavigation(),
      createProjectButtonHandle.click(),
    ]);
  },

  createImageAnnotationProject: async () => {
    nameInputHandle = await page.waitForSelector('#name');
    await nameInputHandle.type('automation image annotation');

    accuracyInputHandle = await page.waitForSelector('#accuracy');
    await accuracyInputHandle.type('5');

    percisionButtonHandle = await page.waitForXPath(
      '//span[contains(., "Precision")]',
    );
    await percisionButtonHandle.click();

    imageAnnotationButtonHandle = await page.waitForXPath(
      '//span[contains(., "图像标注")]',
    );
    await imageAnnotationButtonHandle.click();

    submitButtonHandle = await page.waitForXPath('//button[@type="submit"]');
    await Promise.all([page.waitForNavigation(), submitButtonHandle.click()]);
  },

  addImageAnnotationProjectConfig: async () => {
    await page.waitForXPath('//span[contains(., "详细配置")]');
    detailConfigButtonHandles = await page.$x(
      '//span[contains(., "详细配置")]',
    );
    await Promise.all([
      page.waitForNavigation(),
      detailConfigButtonHandles[1].click(),
    ]);

    addOperatorButtonHandle = await page.waitForXPath(
      '//span[contains(., "添加操作")]',
    );
    await addOperatorButtonHandle.hover();

    operatorsHandle = await page.waitForXPath(
      '/html/body/div[2]/div/div/div/ul/li[1]/div',
    );
    await operatorsHandle.hover();
    await page.waitFor(500);

    box2dOperatorHandle = await page.waitForXPath('//li[contains(., "2D框")]');
    await box2dOperatorHandle.click();

    completeButtonHandle = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[2]/div[2]/div[3]/button',
    );
    await Promise.all([page.waitForNavigation(), completeButtonHandle.click()]);
  },

  getProjectId: async () => {
    // 获取创建完项目后的任务列表链接
    let taskRunList_Xpath = await page.$x(
      '//*[@id="root"]/div/div/div[2]/div/div[1]/a/@href',
    );
    let project_link = await page.evaluate(
      el => el.textContent,
      taskRunList_Xpath[0],
    );
    project_id = project_link
      .replace('/admin/project/', '')
      .replace('/task-run-list', '')
      .replace('/', '')
    
    let project_content_url = page.url().replace('config', 'content').replace('admin/project', 'annotation');
    await page.goto(project_content_url)
  },

  goToProjectAnnotation: async () => {
    // 点击标注工作
    config_to_annotation_button = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[1]/div/nav/a[5]',
    );
    await Promise.all([
      config_to_annotation_button.click(),
      page.waitForNavigation(),
    ]);

    inputButtonHandle = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/span/input',
    );
    await inputButtonHandle.type('582');
    await page.keyboard.press('Enter');

    // 点击搜索
    searchButton = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/span/span',
    );
    await searchButton.click();
  },

  annotaionPageToSearchHandle: async () => {
    inputButtonHandle = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/span/input',
    );
    await inputButtonHandle.type('582');
    await page.keyboard.press('Enter');
    await page.waitFor(3 * 1000);

    // // 点击搜索
    // searchButton = await page.waitForXPath('/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/span/span');
    // await searchButton.click();
  },

  goToAnnotationPool: async () => {
    const spot_check_pool = await page.waitForXPath(
      "//span[contains(., '标注池')]",
    );
    await spot_check_pool.click();

    const [continue_to_annotation] = await page.$x(
      "//span[contains(., '继续吧')]",
    );
    if (continue_to_annotation) {
      await continue_to_annotation.click();
    }
  },

  goToCheckPool: async () => {
    check_pool_button = await page.waitForXPath(
      "//span[contains(., '检查池')]",
    );
    await check_pool_button.click();
  },

  // 点击抽查池
  goToSpotCheckPool: async () => {
    spot_check_pool_button = await page.waitForXPath(
      '//*[@id="root"]/div/div/div[2]/div[2]/div/div/div/div/div/div/table/tbody/tr/td[5]/div/span[3]/a',
    );
    spot_check_pool_button.click();
  },

  // 创建抽检包
  createSpotCheckPackageHandle: async () => {
    create_spot_check_button = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[2]/div[2]/div[1]/div[2]/button',
    );
    await create_spot_check_button.click();

    // 选择题目
    // choose_button = await page.waitForXPath('/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[5]/div[2]/div/div/div/div/div[2]/div/div/div/span[2]/span');
    // await choose_button.click();

    // // 焦点设置到
    // await page.focus('[id="samplingCount"]');
    // // 将文本键入焦点元素

    // await page.keyboard.type('1', { delay: 100 });

    await page.waitFor(2 * 1000);
    // 抽检包创建
    spot_check_commit_button = await page.waitForXPath(
      '/html/body/div[3]/div/div[2]/div/div[2]/div[3]/button[2]/span',
    );
    spot_check_commit_button.click();

    // await Promise.all([
    //     spot_check_commit_button.click(),
    //     page.waitForNavigation()
    // ]);
  },

  // 驳回解散抽检包
  rejectAndDissAnnotationHandle: async () => {
    await page.reload();
    await page.waitFor(3 * 1000);

    ejectAnnotationButton = await page.waitForXPath(
      '/html/body/div/div/div/div[2]/div[2]/div[2]/div/div/div/div/div/table/tbody/tr[1]/td[10]/div/button[2]',
    );
    await ejectAnnotationButton.click();

    page.waitFor(2 * 1000);
    sureRejectAnnotationButton = await page.waitForXPath(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[3]/button[2]',
    );
    await sureRejectAnnotationButton.click();

    dimissAnnotationButton = await page.waitForXPath(
      '//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div/div/div/div/table/tbody/tr[1]/td[10]/div/button[3]',
    );
    await dimissAnnotationButton.click();

    page.waitFor(2 * 1000);
    sureDimissAnnotationButton = await page.waitForXPath(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[3]/button[2]',
    );
    await sureDimissAnnotationButton.click();
  },

  // 驳回解散抽检包
  rejectAnnotationHandle: async () => {
    await page.reload();
    await page.waitFor(3 * 1000);

    ejectAnnotationButton = await page.waitForXPath(
      '/html/body/div/div/div/div[2]/div[2]/div[2]/div/div/div/div/div/table/tbody/tr[1]/td[10]/div/button[2]',
    );
    await ejectAnnotationButton.click();

    page.waitFor(2 * 1000);
    sureRejectAnnotationButton = await page.waitForXPath(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[3]/button[2]',
    );
    await sureRejectAnnotationButton.click();
  },

  annotationImageProjectHandle: async () => {
    // 历史记录
    // console.log('--历史记录');
    // const history_button = await page.waitForXPath('/html/body/div[1]/div/div/header/div/div[3]/div[3]/button');
    // await history_button.click();

    // const close_button = await page.waitForXPath('//span[contains(., 关闭)]');
    // await close_button.click();

    // 拉框选项
    // await page.focus('#root > div > div > div > div.flex.flex-1.bg-gray-200.relative.overflow-y-hidden > div.absolute.top-4.left-4.z-20.select-none > div.flex.flex-col.items-stretch.shadow-lg > button.relative.text-left.flex.items-center.flex.p-4.focus\:outline-none.bg-gray-100.hover\:bg-blue-200');
    pull_frame_action = await page.waitForXPath(
      '/html/body/div[1]/div/div/div/div[1]/div[2]/div[2]/button[2]/div[1]',
    );
    await pull_frame_action.click();

    // action = await page.waitForXPath('/html/body/div/div/div/div/div[1]/div[2]/div[2]/button[2]')
    // await action.click();

    // 将鼠标从一个点上拖动
    await page.mouse.move(300, 300);
    await page.mouse.down();

    // 将鼠标放到另一个点
    await page.mouse.move(400, 530, { steps: 50 }); // 鼠标移动
    await page.mouse.up();

    // 快捷键
    // shortcutKey_button = await page.waitForXPath('/html/body/div[1]/div/div/header/div/div[7]/div[2]/button');
    // await shortcutKey_button.click();
    // shortcutKey_close_button = await page.waitForXPath('/html/body/div[2]/div/div[2]/div/div[2]/div[3]/button[2]');
    // await shortcutKey_close_button.click();
  },

  commitImageAnnotation: async () => {
    comment_button = await page.waitForXPath(
      '/html/body/div/div/div/footer/div[2]/div/div[2]/button',
    );
    await comment_button.click();

    commit_button = await page.waitForXPath('//button[contains(., "提交")]');
    await Promise.all([commit_button.click(), page.waitForNavigation()]);
  },
  closeAnnotationHandle: async () => {
    close_annotation_page_button = await page.waitForXPath(
      '/html/body/div[1]/div/div/header/div/div[1]/div/button',
    );
    await Promise.all([
      close_annotation_page_button.click(),
      page.waitForNavigation(),
    ]);
  },
  closeAnnotationCheckPageHandle: async () => {
    close_annotation_check_page_button = await page.waitForXPath(
      '/html/body/div[1]/div/div/header/div/div[1]/div/button',
    );
    await Promise.all([
      close_annotation_check_page_button.click(),
      page.waitForNavigation(),
    ]);
  },
  // 检查池 驳回
  refuseAnnotationHandle: async () => {
    refuse_button = await page.waitForXPath(
      '/html/body/div/div/div/footer/div[2]/button[2]',
    );
    await refuse_button.click();

    refuse_comment_button = await page.waitForXPath(
      '/html/body/div/div/div/footer/div[2]/div[3]/div[2]/button',
    );
    await refuse_comment_button.click();

    await page.type('textarea', ' 不合格!!!', {
      delay: 20,
    });
    save_button = await page.waitForXPath('//button[contains(., "保存")]');
    await save_button.click();
    commit_button = await page.waitForXPath('//button[contains(., "驳回")]');
    await commit_button.click();

    // 关闭抽检页面
    // await page.waitFor(2 * 1000);
    // close_check_page_button = await page.waitForXPath(
    //   '/html/body/div/div/div/header/div/div[1]/div/button',
    // );
    // await Promise.all([
    //   close_check_page_button.click(),
    //   page.waitForNavigation(),
    // ]);
  },
  // 检查池 合格
  qualifyCommitHandle: async () => {
    comment_button = await page.waitForXPath(
      '/html/body/div[1]/div/div/footer/div[2]/div/div[2]/button',
    );
    await comment_button.click();

    await page.type('textarea', ' 合格 test !!!', {
      delay: 20,
    });
    save_button = await page.waitForXPath('//button[contains(., "保存")]');
    await save_button.click();
    commit_button = await page.waitForXPath('//button[contains(., "合格")]');
    await commit_button.click();

    // 关闭抽检页面
    await page.waitFor(2 * 1000);
    close_check_page_button = await page.waitForXPath(
      '/html/body/div/div/div/header/div/div[1]/div/button',
    );
    await Promise.all([
      close_check_page_button.click(),
      page.waitForNavigation(),
    ]);
  },

  // 用户管理
  adminGoToUserManagePage: async () => {
    // 点击用户管理
    adminGoToUserManagePageButton = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[1]/div/nav/a[4]',
    );
    await Promise.all([
      adminGoToUserManagePageButton.click(),
      page.waitForNavigation(),
    ]);
  },

  // 用户管理
  invitateUserFunc: async () => {
    // 点击邀请用户
    adminGoToUserManagePageButton = await page.waitForXPath(
      '//span[contains(., "邀请用户")]',
    );
    await adminGoToUserManagePageButton.click();

    await page.waitFor(1 * 1000);
    groupButton = await page.waitForSelector('#team_id');
    await groupButton.click();

    await page.waitFor(1 * 1000);
    choosegroupButton = await page.waitForXPath(
      '/html/body/div[3]/div/div/div/div[2]/div/div/div[1]/div',
    );
    await choosegroupButton.click();

    // 项目
    projectButton = await page.waitForSelector('#project_id');
    await projectButton.click();

    await page.waitFor(1 * 1000);
    chooseProjectButton = await page.waitForXPath(
      '/html/body/div[4]/div/div/div/div[2]/div/div/div[1]/div',
    );
    await chooseProjectButton.click();

    // 项目工作池
    projectWorkPoolButton = await page.waitForXPath(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[3]/div[2]/div/div/div/div',
    );
    await projectWorkPoolButton.click();

    await page.waitFor(1 * 1000);
    chooseprojectWorkPoolButton = await page.waitForXPath(
      '/html/body/div[5]/div/div/div/div[2]/div/div/div[1]/div',
    );
    await chooseprojectWorkPoolButton.click();

    projectWorkPoolButton2 = await page.waitForXPath(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[3]/div[2]/div/div/div/div',
    );
    await projectWorkPoolButton2.click();

    // 邀请个数
    inputButtonHandle = await page.waitForSelector('#count');
    await inputButtonHandle.type('1');

    // 结束时间
    closeProjectTimeButton = await page.waitForSelector('#expires_at');
    await closeProjectTimeButton.click();

    // 结束时间 此刻
    await page.waitFor(1 * 1000);
    chooseCloseProjectTimeButton = await page.waitForXPath(
      '/html/body/div[6]/div/div/div/div/div[2]/ul/li[1]',
    );
    await chooseCloseProjectTimeButton.click();

    // 确定
    //  sureCloseProjectTimeButton = await page.waitForXPath('/html/body/div[5]/div/div/div/div/div[2]/ul/li[2]/button');
    //  await sureCloseProjectTimeButton.click();

    // 角色
    await page.waitFor(1 * 1000);
    roleButton = await page.waitForSelector('#role');
    await roleButton.click();
    await page.waitFor(1 * 1000);
    chooseroleButton = await page.waitForXPath(
      '/html/body/div[7]/div/div/div/div[2]/div/div/div[1]/div',
    );
    await chooseroleButton.click();

    // 确定
    await page.waitFor(1 * 1000);
    invitateSureButton = await page.waitForXPath(
      '/html/body/div[2]/div/div[2]/div/div[2]/div[3]/button[2]',
    );
    await invitateSureButton.click();
  },

  // 跳转团队管理
  UserManagePageGoToTeam: async () => {
    teamManagePageButton = await page.waitForXPath(
      '//a[contains(., "团队管理")]',
    );
    await teamManagePageButton.click();
  },

  // 创建团队
  createTeamFunc: async () => {
    groupButton = await page.waitForXPath('//span[contains(., "创建团队")]');
    await groupButton.click();

    await page.waitFor(1 * 1000);
    teamNameInput = await page.waitForSelector('#name');
    await teamNameInput.type('test-name');

    companyNameInput = await page.waitForSelector('#companyName');
    await companyNameInput.type('test-company');

    companyAddressInput = await page.waitForSelector('#companyAddress');
    await companyAddressInput.type('test-companyAddress');

    // 公司税号
    companyTaxNoInput = await page.waitForSelector('#companyTaxNo');
    await companyTaxNoInput.type('666666666');

    ContactNameInput = await page.waitForSelector('#ContactName');
    await ContactNameInput.type('test-ContactName');

    ContactPhoneInput = await page.waitForSelector('#ContactPhone');
    await ContactPhoneInput.type('test-ContactPhone');

    // 团队管理员
    teamAdmin = await page.waitForXPath(
      '/html/body/div[1]/div/div/div[3]/form/div[1]/div[3]/div/div[2]/div/div/div/div/span[2]',
    );
    await teamAdmin.click();

    // 团队管理员-添加人员
    await page.waitFor(2 * 1000);
    addteamAdminButton = await page.waitForXPath(
      '/html/body/div[3]/div/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/div/div/div[1]/table/thead/tr/th[1]/div/label/span/input',
    );
    await addteamAdminButton.click();

    // 团队管理员-添加人员-关闭
    addteamAdminCloseButton = await page.waitForXPath(
      '/html/body/div[3]/div/div[2]/div/div[2]/div[3]/button',
    );
    await addteamAdminCloseButton.click();

    // 确定
    await page.waitFor(1 * 1000);
    teamAdminSubmitButton = await page.waitForXPath('//button[@type="submit"]');
    await teamAdminSubmitButton.click();
  },
};
