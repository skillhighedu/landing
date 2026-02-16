import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import axios from "axios";

const BASE_URL = "https://skillhigh.in";

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });

  // ---------- STATIC ROUTES ----------
  const staticRoutes = [
    "/all-courses",
    "/contact-us",
    "/outsource",
    "/blogs",
    "/signup",
    "/profile",
  ];

  staticRoutes.forEach((route) =>
    sitemap.write({
      url: route,
      changefreq: "weekly",
      priority: 0.7,
    })
  );

  // ---------- COURSES ----------
  const { data: courseRes } = await axios.get(
    "https://api.skillhigh.in/api/v2/courses/formatted-courses"
  );

  const courses = courseRes.additional || [];

  courses.forEach((course: any) => {
    sitemap.write({
      url: `/course/${course.slug}`,
      changefreq: "weekly",
      priority: 0.9,
    });
  });

  // ---------- BLOGS ----------
  const { data: blogRes } = await axios.get(
    "https://api.skillhigh.in/api/v2/blogs/blog"
  );

  const blogs = blogRes.additional || [];

  blogs.forEach((blog: any) => {
    sitemap.write({
      url: `/blogs/${blog.slug}`,
      changefreq: "monthly",
      priority: 0.8,
    });
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap).then((data) => data.toString());

  writeFileSync("./public/sitemap.xml", xml);

  console.log("✅ Dynamic sitemap generated successfully");
}

generateSitemap();
