const puppeteer = require("puppeteer");
const readline = require("readline");
const { URL } = require("url");
// const { missingTagsCsv, brokenLinksCsv } = require("../csvWriter");
const {
    htmlTags,
    skipRoutes,
    MAX_CONCURRENT_BROWSERS,
    urlToCrawl,
} = require("../config");

const routes = ['/', ''];

beforeAll(async () => {
    global.browser = await puppeteer.launch();
});

afterAll(async () => {
    await browser.close();
});

test("checks the route for title and description", async () => {
    
    const page = await browser.newPage();
    await page.goto(urlToCrawl, { waitUntil: "networkidle2" });

    const title = await page.title();
    const metaDescription = await page.$eval(
        'meta[name="description"]',
        (element) => element.getAttribute("content")
    );

    // const seoErrors = await page.evaluate((htmlTags) => {
    //     return htmlTags.filter((tag) => !document.querySelector(tag));
    // }, htmlTags);

    // expect(seoErrors).toEqual([]);
    expect(title).toEqual("Save Time and Money with InterviewHQ");
    expect(metaDescription).toEqual(
        "Discover how InterviewHQ automates and enhances your interview process with AI-powered tools. Save time and reduce hiring costs."
    );
    await page.close();
}, 60000);