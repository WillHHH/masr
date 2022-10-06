import data from "data/global.json";

export function withGlobalProps(pageProps) {
  return {
    globalProps: data,
    ...pageProps,
  };
}
