import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";
import { getRegion, getRegionGTM } from "util/region";

const middleware: NextMiddleware = (req) => {
  const PUBLIC_FILE = /\.(.*)$/;

  if (PUBLIC_FILE.test(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // const id = req.nextUrl.searchParams.get("_storyblok");
  // const space = req.nextUrl.searchParams.get("_storyblok_tk[space_id]");
  // // If there is an id and a space, it's probably a preview link
  // if (req.url.indexOf("?") && id && space) {
  //   // We are going to reuse the URL that comes in from the request, but
  //   // that URL will be regional, so we need to do some surgery to keep
  //   // it from redirecting to a regionalized API url.
  //   const url = req.nextUrl.clone();
  //   url.pathname = `/api/preview`;
  //   url.search = `?secret=${process.env.STORYBLOK_PREVIEW_TOKEN}&slug=${req.nextUrl.locale}${req.nextUrl.pathname}`;
  //   return NextResponse.redirect(url);
  // }

  const region = getRegion(req);
  const gtmid = getRegionGTM(region);

  // greenlight storyblok reqs and local reqs
  // const referer = req.headers.get("referer");
  // if (
  // referer !== null &&
  // (referer.startsWith("http://localhost") ||
  //   referer.match(/^https?\:\/\/app\.storyblok\.com\//gim) ||
  //   referer.match(
  //     /^(?:https?:\/\/)(?:[a-z0-9]+(?:[_-][a-z0-9]+)*)+\.vercel\.app/gim,
  //   ))
  // ) {
  //   return NextResponse.next().cookie("gtmid", gtmid).cookie("region", region);
  // }

  const response = NextResponse.next();
  response.cookies.set("gtmid", gtmid);
  response.cookies.set("region", region);
  return response;
};

export default middleware;
