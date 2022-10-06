import type { NextApiRequest, NextApiResponse } from "next";
import { getStoryblokApi } from "@storyblok/react";

import "util/storyblok";
export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.query.secret !== process.env.STORYBLOK_PREVIEW_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const storyblokApi = getStoryblokApi();

  const slug =
    (Array.isArray(req.query.slug)
      ? req.query.slug.join("/")
      : req.query.slug) ?? "home";
  const locale = Array.isArray(req.query.slug)
    ? req.query.slug[0] ?? "en"
    : req.query.slug?.split("/")?.[0] ?? "en";

  const sbParams = {
    version: "draft",
    resolve_relations: ["featured-posts.posts", "selected-posts.posts"],
    language: locale,
  };

  const { data } = await storyblokApi.get(`cdn/stories/${slug}/`, sbParams);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!data) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Set cookie to None, so it can be read in the Storyblok iframe
  const cookies = res.getHeader("Set-Cookie") as string[];
  res.setHeader(
    "Set-Cookie",
    cookies.map((cookie) =>
      cookie.replace("SameSite=Lax", "SameSite=None;Secure"),
    ),
  );

  // Redirect to the path from the fetched data
  res.redirect(`/${data.story?.full_slug || ""}`);
}
