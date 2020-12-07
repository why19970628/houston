module.exports = {

    expectElementToLoadByXpath: async (xpath) => {
        elementHandle = await page.waitForXPath(xpath);
        expect(elementHandle).toBeTruthy()
    },
    
    expectElementToLoadBySelector: async (selector) => {
        elementHandle = await page.waitForSelector(selector);
        expect(elementHandle).toBeTruthy()
    },

    expectElementPropertyBySelector: async (selector, propName, propValue) => {
        elementHandle = await page.waitForSelector(selector);
        const elementPropHandle = await elementHandle.getProperty(propName);
        const elementPropValue = await elementPropHandle.jsonValue();
        expect(elementPropValue).toEqual(propValue);
    },

    expectElementPropertyByXpath: async (xpath, propName, propValue) => {
        elementHandle = await page.waitForXPath(xpath);
        const elementPropHandle = await elementHandle.getProperty(propName);
        const elementPropValue = await elementPropHandle.jsonValue();
        expect(elementPropValue).toEqual(propValue);
    }
}