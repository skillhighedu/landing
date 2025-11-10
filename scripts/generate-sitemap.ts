import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

const sitemapRoutes = [
  "/", 
  "/all-courses",
  "/contact-us",
  "/outsource",
  "/signup",
  "/profile",
  "/course"
];

(async () => {
  const sitemap = new SitemapStream({ hostname: "https://skillhigh.in" });

  sitemapRoutes.forEach((route) => sitemap.write({ url: route, changefreq: "daily", priority: 0.9 }));
  sitemap.end();

  const data = await streamToPromise(sitemap);
  writeFileSync("./dist/sitemap.xml", data.toString());
  console.log("✅ Sitemap generated successfully");
})();
