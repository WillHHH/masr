import React from "react";
import { getAllSlugs } from "../../lib/api";

const generateSitemap = (posts, url) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${posts
          .map(({ slug }) => {
            return `
                    <url>
                        <loc>https://${url}/${slug}</loc>
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;
};

export async function getServerSideProps({ req, res, locales }) {
  const url = req?.headers?.host;
  const posts = await getAllSlugs(locales);
  res.setHeader("Content-Type", "text/xml");
  res.write(generateSitemap(posts, url));
  res.end();

  return {
    props: {},
  };
}

const Sitemap = () => <div />;
export default Sitemap;
