const pageInteractions = require('./pageInteractions');
const projectUtils = require('./createProjectUtils');

module.exports = {
    // 创建图片标注项目
    creataImageProject: async () => {
        await pageInteractions.goToLoginPage();
        await pageInteractions.performLogin();
        await pageInteractions.goToProjectLounge();
        // 开始创建项目
        await pageInteractions.clickCreateProject();

        await pageInteractions.createImageAnnotationProject();
        // 工作流配置
        await projectUtils.workflowConfig();
        await pageInteractions.addImageAnnotationProjectConfig();
        // 数据集配置
        await projectUtils.workflowDataSetConfig();
    },
}