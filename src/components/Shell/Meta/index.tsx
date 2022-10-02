import Head from "next/head";
import { NextRouter } from "next/router";

type SEO = {
  description: string;
  og_description: string;
  og_image: string;
  og_title: string;
  title: string;
  twitter_description: string;
  twitter_image: string;
  twitter_title: string;
};

export type MetaProps = {
  story: any;
  router: NextRouter;
};

const Meta = ({ router, story }: MetaProps) => {
  const seo: SEO = story.content?.seo;

  const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
  const host = process.env.NEXT_PUBLIC_HOST;

  const siteUrl =
    router.asPath === "/"
      ? `${protocol}://${host}${router.asPath}`
      : `${protocol}://${host}/${router.locale}${router.asPath}`;

  const renderTitle = () => {
    switch (router.locale) {
      case "zh":
        return "MASR";
      default:
        return "MASR";
    }
  };

  // TODO: Migrate these default values to CMS global config
  let title = seo?.title ?? "MASR";
  if (title.length < 1) {
    switch (story?.content?.component) {
      case "page_bio":
        title = story.content.body?.[0]?.name ?? "";
        break;
      default:
        title = story?.content?.body?.[0]?.title ?? "";
        break;
    }
  }
  if (title.length > 0 && router.pathname !== "/") {
    title += ` - ${renderTitle()}`;
  }

  const description = seo?.description?.replace?.(/\n+/g, " ");
  const image = seo?.og_image;

  const og_title = seo?.og_title || title;
  const og_description = seo?.og_description || description;

  const twitter_title = seo?.twitter_title || title;
  const twitter_description = seo?.twitter_description || description;
  const twitter_image = seo?.twitter_image || image;

  return (
    <Head>
      <link rel="canonical" href={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      {!!title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={og_title} />
          <meta name="twitter:title" content={twitter_title} />
        </>
      )}
      {!!description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={og_description} />
          <meta name="twitter:description" content={twitter_description} />
        </>
      )}
      {!!image && (
        <>
          <meta property="og:image" content={image} key="og_image" />
          <meta
            property="og:image:secure_url"
            content={image}
            key="og_image_secure"
          />
        </>
      )}
      {!!twitter_image && (
        <>
          <meta
            name="twitter:card"
            content="summary_large_image"
            key="twitter_card_type"
          />
          <meta name="twitter:image" content={twitter_image} />
        </>
      )}
    </Head>
  );
};

export default Meta;
