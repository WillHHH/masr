import { ReactNode, useEffect } from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import styles from "./Shell.module.scss";
import { useRouter } from "next/router";

import ServicesSection from "components/sections/ServicesSection/ServicesSection";
import WhatWeDo from "components/sections/WhatWeDo/WhatWeDo";
import ContactUs from "components/sections/ContactUs/ContactUs";
import { serviceCards, contactInfo } from "data/mock/custom";

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
        <ServicesSection
          cards={serviceCards}
          title="We Provide Best Services"
          content="There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer."
        />
        <WhatWeDo
          title="What We Do"
          content="There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer."
          items={["188", "194", "196", "197", "199", "200"]}
        />
        <ContactUs
          title="Contact Us"
          content="There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer."
          contacts={contactInfo}
        />
      </div>
      {footer && <Footer story={footer.story} />}
    </>
  );
};

export default Shell;
