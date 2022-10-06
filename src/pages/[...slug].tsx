import "util/storyblok";

export { default, getStaticProps } from ".";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
