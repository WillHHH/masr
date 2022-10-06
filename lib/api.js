// Initial Graphql API config
export async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch("https://gapi.storyblok.com/v1/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Token: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
      Version: preview ? "draft" : "published",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

// Get all slugs for sitemap
export async function getAllSlugs(locales) {
  const data = await fetchAPI(
    `
  query AllSlugs {
    Links(starts_with: "") {
      items {
        slug
      }
    }
  }
  `,
    {
      preview: false,
    },
  );
  const results = [];
  data?.Links?.items?.map((item) => {
    const newItem = { ...item };
    if (locales.includes(item.slug.slice(0, 2))) {
      item.slug = newItem.slug.slice(item.slug.startsWith("en/") ? 3 : 0);
      results.push(item);
    }
  });
  return results || [];
}
