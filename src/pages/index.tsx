import { useRouter } from "next/router";
import type { StoryblokResult } from "storyblok-js-client";
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

import "util/storyblok";
import FourOhFour from "components/common/404/404";
import PreviewModeIndicator from "components/common/PreviewModeIndicator/PreviewModeIndicator";

export const resolve_relations = [
  "featured-posts.posts",
  "selected-posts.posts",
  "contact_section.locations",
  "people_bio.locationRelation",
  "job_post_body.jobLocation",
];

// Next.js in development mode and in fallback will try to render the page, even when 404.
// We need to avoid calling the Storyblok API in such cases.
const PreRoute = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  } else if (!props.sbParams) {
    return <FourOhFour />;
  } else {
    return <Route {...props} />;
  }
};

const Route = ({ story: initialStory, sbParams, preview, ...props }) => {
  // These come back from server as a single string, so fixing here
  sbParams.resolve_relations = resolve_relations;

  const story = useStoryblokState<any>(initialStory, sbParams);

  return (
    <>
      <StoryblokComponent blok={story.content} />
      {preview && <PreviewModeIndicator />}
    </>
  );
};

export default PreRoute;

export async function getStaticProps({
  locale,
  locales,
  defaultLocale,
  params,
  preview = false,
}) {
  const storyblokApi = getStoryblokApi();
  const slug = params?.slug ? params.slug.join("/") : "home";

  const sbParams: any = {
    version: "published", // "published" or "draft"
    resolve_relations: resolve_relations,
  };

  if (preview || !!process.env.NEXT_PUBLIC_PREVIEW) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  const localeString =
    slug === "comp" ? "" : locale !== "default" ? locale : "en";

  let result: StoryblokResult;
  try {
    result = await storyblokApi.get(
      `cdn/stories/${localeString}/${slug === "home" ? "" : slug}`,
      sbParams,
    );
  } catch (error) {
    if (error.response.status === 404) {
      return {
        notFound: true,
        revalidate: 720,
      };
    }
  }

  let headerResult: StoryblokResult;
  let footerResult: StoryblokResult;
  try {
    [headerResult, footerResult] = await Promise.all([
      storyblokApi.get(`cdn/stories/${localeString}/header`, sbParams),
      storyblokApi.get(`cdn/stories/${localeString}/footer`, sbParams),
    ]);
  } catch (error) {
    console.error(error);
  }

  // Build list of additional locales content for this page
  const contentLocales =
    result?.data?.story?.alternates.map((localeInfo) =>
      localeInfo.full_slug.substring(0, 2),
    ) || [];
  // Add the current locale
  if (result?.data.story) {
    contentLocales.unshift(result.data.story.full_slug.substring(0, 2));
  }

  return {
    props: {
      story: result?.data ? result.data.story : false,
      header: headerResult.data,
      footer: footerResult.data,
      preview,
      sbParams,
      locale,
      locales,
      defaultLocale,
      contentLocales,
    },
    revalidate: 720,
  };
}
