const secretConfig = require('../config/secret');
const PROJECT_ID = Symbol.for('project');

module.exports = {

    goToLoginPage: async () => {
        await module.exports.setInitLanguageToChinese();
        await page.goto(`${process.env.FRONTEND_HOST}auth/login`);
    },

    contentPageGoToAnnoPage: async () => {
        contentPageGoToAnnoPageButton = await page.waitForXPath('//span[contains(., "开始做题")]');
        await Promise.all([
            page.waitForNavigation(),
            clickRegisterButton.click()
        ]);
    },

    contentPageGoToCheckoPage: async () => {
        contentPageGoToCheckoPageButton = await page.waitForXPath('//span[contains(., "开始检查")]');
        await Promise.all([
            page.waitForNavigation(),
            contentPageGoToCheckoPageButton.click()
        ]);
    },

    samplingPageBackToContentHandle: async () => {
        samplingPageBackToContentButton = await page.waitForXPath('/html/body/div[1]/div/div/div[2]/div[1]/div/span[2]/span[1]/a');
        await Promise.all([
            page.waitForNavigation(),
            samplingPageBackToContentButton.click()
        ]);
    }


}