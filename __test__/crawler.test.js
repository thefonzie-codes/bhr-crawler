// const {
//     htmlTags,
//     skipRoutes,
//     MAX_CONCURRENT_BROWSERS,
//     urlToCrawl,
// } = require("../config");

const rl = require("readline");
const puppeteer = require("expect-puppeteer");

const { seoData } = require("../seoData");
const url = "http://localhost:3000";

const MAX_CONCURRENT_BROWSERS = 3;
const queue = [];

async function withBrowser(fn) {
    while (queue.length >= MAX_CONCURRENT_BROWSERS) {
        await Promise.race(queue);
    }

    const browserPromise = fn(browser).finally(() => {
        queue.splice(queue.indexOf(browserPromise), 1);
    });

    queue.push(browserPromise);
    return browserPromise;
}

seoData.forEach((data) => {
    const { route, title, description } = data;
    const fullUrl = url + route;

    describe(`${url + route}`, () => {

        beforeAll(async () => {
            // await page.goto(fullUrl);
            await withBrowser(async (browser) => {
                page = await browser.newPage();
                await page.goto(fullUrl);
            });
        });

        it("should match the given title tag", async () => {
            await expect(page.title()).resolves.toBe(title);
        });

        it("should match the given meta description", async () => {
            await expect(
                page.$eval(
                    "meta[name=description]",
                    (actualDescription) => actualDescription.content
                )
            ).resolves.toBe(description);
        });

        // const seoErrors = await page.evaluate((htmlTags) => {
        //     return htmlTags.filter((tag) => !document.querySelector(tag));
        // }, htmlTags);

        // expect(seoErrors).toEqual([]);
    });
});
