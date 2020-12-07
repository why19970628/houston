module.exports = {
  ChromeBrowserConfig: {
    // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 `/项目目录/node_modules/puppeteer/.local-chromium/`
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    //设置超时时间
    timeout: 15000,
    //如果是访问https页面 此属性会忽略https错误
    ignoreHTTPSErrors: true,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: false,
    // 关闭headless模式, 不会打开浏览器
    headless: false,
  },
  DefaultBrowserConfig: {
    ignoreHTTPSErrors: true,
    timeout: 15000,
    defaultViewport: null, //窗口参数
    headless: false,
    // slowMo: 50,       //放慢浏览器执行速度，方便测试观察
    args: ['--start-maximized'],
  },
};
