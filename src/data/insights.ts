import { useEffect, useState, DependencyList } from "react";

type FetcherOptions = {
  count: number;
  category?: string;
  locale: string;
  page?: number;
  excluding_ids?: string;
};

const API_STORIES_URI = "https://api.storyblok.com/v2/cdn/stories";

export const fetchStoryblok = async (vars: any) => {
  const url =
    API_STORIES_URI +
    "?" +
    Object.keys(vars)
      .map((key) => [key, vars[key]].join("="))
      .join("&");
  const res = await fetch(url);
  const total = parseInt(res.headers.get("total"), 10);
  const data = await res.json();
  return { ...data, total };
};

export const fetchFeaturedInsights = async ({
  page = 1,
  count = 4,
  category = null,
  locale = "en",
}: FetcherOptions) => {
  // Query reference: https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/retrieve-multiple-stories
  const vars: any = {
    token: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    version: "published",
    per_page: count.toString(),
    sort_by: "content.body.1.date:desc",
    starts_with: locale + "/insights/",
    page,
    "filter_query[featured][is]": "true",
    content_type: "page_insight",
    is_startpage: "false",
  };

  if (category === "insights") {
    vars.level = 3;
  } else if (category) {
    vars.starts_with += category + "/";
  }
  const data = await fetchStoryblok(vars);

  if (!data.stories) {
    return {
      stories: [],
      total: data.total,
    };
  }

  if (data.stories.length >= 4) {
    return {
      stories: data.stories,
      total: data.total,
    };
  }

  const excluding_ids = data.stories.map((story) => story.id);
  const addStories = await fetchRecentInsights({
    count: count - data.stories.length,
    category,
    locale,
    excluding_ids: excluding_ids.join(","),
  });

  return {
    stories: [...data.stories, ...addStories.stories],
    total: data.total,
  };
};

export const fetchRecentInsights = async ({
  page = 1,
  count = 4,
  category = null,
  locale = "en",
  excluding_ids = null,
}: FetcherOptions) => {
  // Query reference: https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/retrieve-multiple-stories
  const vars: any = {
    token: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    version: "published",
    per_page: count.toString(),
    sort_by: "content.body.1.date:desc",
    starts_with: locale + "/insights/",
    page,
    content_type: "page_insight",
    is_startpage: "false",
    excluding_ids,
  };

  if (category === "insights") {
    vars.level = 3;
  } else if (category) {
    vars.starts_with += category + "/";
  }

  const data = await fetchStoryblok(vars);

  return { stories: data.stories ?? [], total: data.total };
};

const useInsights = (
  { page = 1, count = 4, category = null, locale = "en" }: FetcherOptions,
  fetcher: typeof fetchFeaturedInsights | typeof fetchRecentInsights,
  deps: DependencyList,
) => {
  const [insights, setInsights] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetcher({
      count,
      category,
      locale: "en",
      page,
    })
      .then(({ stories, total }) => {
        if (!mounted) return;
        setInsights(page === 1 ? stories : insights.concat(stories));
        setTotal(total);
      })
      .catch((error) => {
        console.error(error);
        // TODO: Add some Error Bounds
        if (!mounted) return;
        setInsights([]);
      });
    return () => {
      mounted = false;
    };
  }, deps);

  return { insights, total };
};

export const useFeaturedInsights = (
  options: FetcherOptions,
  deps: DependencyList,
) => useInsights(options, fetchFeaturedInsights, deps);

export const useRecentInsights = (
  options: FetcherOptions,
  deps: DependencyList,
) => useInsights(options, fetchRecentInsights, deps);
