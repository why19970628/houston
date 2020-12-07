module.exports = {
  preset: "jest-puppeteer",
  testTimeout: 40000,
  testMatch: [
    "**/login/checkRegister.test.js",
    "**/login/login.test.js",
    "**/project-admin/createProject.test.js",
    "**/project-admin/annotationProject.test.js",
    "**/project-admin/checkImageAnnotation.test.js",
    "**/project-admin/invitateUser.js",
    "**/project-admin/teamManage.test.js",
    "**/project-admin/rejectImageAnnotationByFrequency.test.js",
    "**/project-admin/checkAnnotationByPeople.test.js",
    "**/project-admin/topicCirculation.test.js"
  ],
  setupFiles: ["dotenv/config"],
}