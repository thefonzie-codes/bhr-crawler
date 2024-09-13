# seo-crawler

Crawls the specified site with Puppeteer, and returns any missing tags based on the URL.

Use the config.js file to change the tags you search for or ignore certain routes. You can adjust the number of chrome instances that it generates in the config file as well.

Install with:

```bash
npm i
```

Run with:

```bash
npm run crawl
```

It will prompt you for the URL you would like to crawl.  If it is localhost, make sure you add "http://" otherwise, it will add "https://" and error out. Otherwise, "example.com" works fine.

It will also output 2 csv files:

brokenLinks.csv
missingTags.csv