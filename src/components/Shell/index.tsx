import { ReactNode, useEffect } from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import styles from "./Shell.module.scss";
import { useRouter } from "next/router";

type ShellProps = {
  children: ReactNode;
  header: any;
  footer: any;
  contentLocales: string[];
};

const insightsCategoryGreenList = [
  "list",
  "news",
  "award-wins",
  "recent-hires",
  "elections",
];

const Shell = ({ header, footer, contentLocales, children }: ShellProps) => {
  const router = useRouter();
  useEffect(() => {
    const len = (router.asPath.match(/\//g) || []).length;
    if (
      router.asPath === "/" ||
      len > 2 ||
      router.asPath.startsWith("/portfolio") ||
      (router.asPath.startsWith("/insights/") &&
        !insightsCategoryGreenList.find((cat) =>
          router.asPath.startsWith("/insights/" + cat),
        ) &&
        len > 1)
    ) {
      document.body.classList.remove("brown");
    } else {
      document.body.classList.add("brown");
    }
  }, [router.asPath]);
  return (
    <>
      <div className={styles.wrap}>
        {header && (
          <Header story={header.story} contentLocales={contentLocales} />
        )}
        {children}
      </div>
      {footer && <Footer story={footer.story} />}
    </>
  );
};

export default Shell;
