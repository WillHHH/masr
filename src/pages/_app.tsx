import { useEffect, createContext } from "react";
import { NextIntlProvider } from "next-intl";
import TagManager from "react-gtm-module";

import Shell from "components/Shell";
import { useRouter } from "next/router";
import { ConfigContext } from "components/Shell/ConfigContext";
import Meta from "components/Shell/Meta";
import getCookie from "util/cookie";
import { SessionProvider } from "next-auth/react";

import "../styles/main.scss";

type TSwitchLocale = (locale: string) => void;
export const SwitchLocaleContext = createContext<TSwitchLocale>(() => null);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const gtmid = {
      gtmId: getCookie("gtmid"),
      auth: getCookie("gtmauth"),
      preview: getCookie("gtmenv"),
      dataLayer: {
        corpRegion: getCookie("region"),
      },
    };
    TagManager.initialize(gtmid);
  }, []);

  const router = useRouter();
  const { pathname, asPath, query, isFallback, locale } = router;

  useEffect(() => {
    const dir = locale == "ar" ? "rtl" : "ltr";
    document.querySelector("html").setAttribute("dir", dir);
  }, [locale]);

  const switchLocale: TSwitchLocale = (locale) => {
    router.push({ pathname, query }, asPath, {
      locale: locale,
    });
  };

  return (
    <SessionProvider session={pageProps.session}>
      <NextIntlProvider messages={pageProps.localizedStrings}>
        <ConfigContext.Provider
          value={{
            header: pageProps?.header,
            footer: pageProps?.footer,
            headerColor: "56, 21, 81",
          }}
        >
          <SwitchLocaleContext.Provider value={switchLocale}>
            {isFallback ? null : (
              <>
                {pageProps?.story && (
                  <Meta story={pageProps.story} router={router} />
                )}
                <Shell
                  header={pageProps?.header}
                  footer={pageProps?.footer}
                  contentLocales={pageProps.contentLocales}
                >
                  <Component {...pageProps} />
                </Shell>
              </>
            )}
          </SwitchLocaleContext.Provider>
        </ConfigContext.Provider>
      </NextIntlProvider>
    </SessionProvider>
  );
}

export default MyApp;
