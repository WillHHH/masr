import qs from "qs";

export async function fetchCollectionType(type, options = {}) {
  const { NEXT_PUBLIC_STRAPI_API_URL } = process.env;

  // Remove trailing slash if it exists
  const lastChar = NEXT_PUBLIC_STRAPI_API_URL.charAt(
    NEXT_PUBLIC_STRAPI_API_URL.length - 1,
  );
  const apiUrl =
    lastChar === "/"
      ? NEXT_PUBLIC_STRAPI_API_URL.slice(0, -1)
      : NEXT_PUBLIC_STRAPI_API_URL;

  const queryString = qs.stringify(options);
  const res = await fetch(`${apiUrl}/${type}?${queryString}`);
  return await res.json();
}

// Advanced api fetch
export async function apiRequest(apiPath, options) {
  const defaults = {
    headers: {
      "content-type": "application/json",
    },
  };

  const combinedOptions = {
    ...defaults,
    ...options,
    headers: {
      ...defaults.headers,
      ...options.headers,
    },
    // check if dontStringify is set
    body: options.dontStringify ? options.body : JSON.stringify(options.body),
  };

  if (options.removeContentType) {
    delete combinedOptions.headers["content-type"];
  }

  return await fetch(`${apiPath}`, combinedOptions)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw res;
      }
    })
    .catch((err) => {
      if (err.json) {
        return err.json().then((error_json) => {
          throw error_json;
        });
      } else {
        throw err;
      }
    });
}

// StoryBlok Fetch

export const defaultStoryOptions = {
  token: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  version: "published",
  language: "en",
};

export const storyRequestBasePath = "https://api.storyblok.com/v2/cdn/stories";

export async function storyRequest(options) {
  const queryString = qs.stringify(
    {
      ...defaultStoryOptions,
      ...options,
    },
    { addQueryPrefix: true },
  );

  const res = await fetch(storyRequestBasePath + queryString);
  const total = parseInt(res.headers.get("total"), 10);
  const data = await res.json();

  return { stories: data.stories, rels: data.rels, total };
}

export async function dataSourceRequest(slug) {
  const queryString = qs.stringify(
    {
      datasource: slug,
      // version: "published",
      token: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    },
    { addQueryPrefix: true },
  );
  const res = await fetch(
    "https://api.storyblok.com/v2/cdn/datasource_entries" + queryString,
  );
  const data = await res.json();
  return data.datasource_entries;
}
