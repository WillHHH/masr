import type { NextApiRequest, NextApiResponse } from "next";

export default async function exit(_: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();

  // set the cookies to None
  const cookies = res.getHeader("Set-Cookie") as string[];
  res.setHeader(
    "Set-Cookie",
    cookies.map((cookie) =>
      cookie.replace("SameSite=Lax", "SameSite=None;Secure"),
    ),
  );

  // Redirect the user back to the index page.
  res.redirect("/");
}
