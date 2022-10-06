import cx from "classnames";

import Container from "components/Layout/Container";
import LinkWrap from "components/common/LinkWrap/LinkWrap";
import Logo from "components/common/Logo/Logo";

import styles from "./Footer.module.scss";
import useScrollOffset from "util/hooks/useScrollOffset";
import { ReactComponent as LinkedIn } from "images/linked-in-icon.svg";
import { ReactComponent as Instagram } from "images/instagram-icon.svg";
import { ReactComponent as Twitter } from "images/twitter-icon.svg";
import { useRouter } from "next/router";

type FooterProps = {
  className?: string;
  story: any;
};

const Footer = ({ className, story }: FooterProps) => {
  const { routes, copyRights } = story.content;
  const { locale } = useRouter();

  const [, scrollProgress] = useScrollOffset();
  const bgOffset = -Math.round((scrollProgress / 4) * 200) + 50;

  const mockedRoutes = [
    {
      label: "Home",
      href: "/#home",
    },
    {
      label: "Services",
      href: "/#services",
    },
    {
      label: "What We Do",
      href: "/#what-we-do",
    },
    {
      label: "Contact Us",
      href: "/#contact-us",
    },
  ];

  const handleClick = (e, id) => {
    e.preventDefault();
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      className={cx(styles.base, className)}
      style={{
        backgroundPosition: `center ${bgOffset}px`,
      }}
    >
      <Container>
        <div className={styles.top}>
          <div className={styles.left}>
            <Logo />
            {/* <img src="/images/footer-logo.svg" alt="FGS Global" /> */}
            <ul>
              {mockedRoutes?.map((route) => (
                <li key={route.label}>
                  <LinkWrap
                    href={route.href}
                    onClick={(e) => handleClick(e, route.href.slice(2))}
                  >
                    {route.label}
                  </LinkWrap>
                </li>
              ))}
            </ul>
          </div>
          <div className={cx(styles.right, styles.desktop)}></div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomInfo}>
            <div className={cx(styles.left, locale === "ar" && styles.arLeft)}>
              <ul>
                {/* {copyRights?.map((route) => (
                  <li key={route._uid}>
                    <LinkWrap href={route.href?.cached_url}>
                      {route.label}
                    </LinkWrap>
                  </li>
                ))} */}
                <li>
                  <LinkWrap>
                    Copyright © 2021 - 2022 SR AUTO GROUP All Rights Reserved.
                  </LinkWrap>
                </li>
              </ul>
            </div>
            <div className={styles.right}>
              <LinkWrap href="/">
                <Instagram />
              </LinkWrap>
              <LinkWrap href="/">
                <Twitter />
              </LinkWrap>
            </div>
          </div>
          <div className={cx(styles.right, styles.mobile)}></div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
