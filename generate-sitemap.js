const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const routes = require('./src/routes');

const SitemapGenerator = async () => {
    const sitemap = new SitemapStream({ hostname: 'https://aqua-book.ru' });
    const writeStream = fs.createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));

    sitemap.pipe(writeStream);

    const generateUrls = (routes, parentPath = '') => {
        routes.forEach(route => {
            const fullPath = `${parentPath}${route.path === '/' ? '' : '/' + route.path}`;
            sitemap.write({ url: fullPath, changefreq: 'weekly', priority: 0.8 });

            if (route.children) {
                generateUrls(route.children, fullPath);
            }
        });
    };

    generateUrls(routes);
    sitemap.end();

    // Use streamToPromise on the SitemapStream
    streamToPromise(sitemap)
        .then(() => {
            console.log('Sitemap generated successfully!');
        })
        .catch(console.error);
};

SitemapGenerator().catch(console.error);
