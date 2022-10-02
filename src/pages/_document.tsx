import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" sizes="48x48" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}