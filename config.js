const htmlTags = [
    'title', 
    'meta[name="description"]', 
    // 'meta[name="keywords"]', 
    'h1', 
    // 'h2', 
    // 'h3', 
    // 'h4', 
    // 'h5', 
    // 'h6', 
    // 'meta[name="robots"]', 
    // 'meta[property="og:title"]',
    // 'meta[property="og:description"]',
];

const skipRoutes = [
    "/blog"
];

const MAX_CONCURRENT_BROWSERS = 5;

module.exports = { htmlTags, skipRoutes, MAX_CONCURRENT_BROWSERS };