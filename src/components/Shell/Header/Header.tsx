import { useState, useEffect } from "react";
import cx from "classnames";
import Container from "components/Layout/Container";
import Logo from "components/common/Logo/Logo";
import MenuIcon from "components/Shell/MenuIcon/MenuIcon";
import LangToggle from "components/Shell/LangToggle/LangToggle";
import Nav from "components/Shell/Nav/Nav";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";
import LinkWrap from "components/common/LinkWrap/LinkWrap";
import useScrollOffset from "util/hooks/useScrollOffset";
import useWindowEvent from "util/hooks/useWindowEvent";
import { useIsMounted } from "usehooks-ts";
import { ReactComponent as LinkedIn } from "images/linked-in-icon.svg";
import { ReactComponent as Instagram } from "images/instagram-icon.svg";
import { ReactComponent as Twitter } from "images/twitter-icon.svg";

type HeaderProps = {
  className?: string;
  story: any;
  contentLocales: string[];
};

const Header = ({ className, story, contentLocales }: HeaderProps) => {
  const isMounted = useIsMounted();
  const [isOpen, setOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const { locale } = useRouter();

  useWindowEvent(
    "resize",
    () => {
      setOpen(false);
    },
    [],
  );

  const router = useRouter();
  const slugsArray = router?.query?.slug && Array.from(router.query.slug);
  let routeLevel =
    router.asPath === "/"
      ? 1
      : slugsArray?.filter((item) => item !== "index")?.length;
  if (routeLevel > 3) routeLevel = 3;

  const [scrollOffset] = useScrollOffset();
  const bgFade = Math.min(1, scrollOffset / 150);
  const border = Math.min(1, -scrollOffset / 150 + 1);

  useEffect(() => {
    scrollOffset > 150 && setShrink(true);
    scrollOffset < 20 && setShrink(false);
  }, [scrollOffset]);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setOpen(false);
    });
    return () => {
      router.events.off("routeChangeStart", () => null);
    };
  }, [router.events]);

  return (
    <header
      className={cx(
        styles.base,
        routeLevel < 2 && styles.useImage,
        isOpen && styles.open,
        className,
        { [styles.mounted]: isMounted() },
      )}
      style={{
        borderBottom: `1px solid rgba(255, 255, 255, ${border / 2})`,
        backgroundColor:
          routeLevel > 1 ? `rgb(0, 0, 0)` : `rgba(0, 0, 0, ${bgFade})`,
      }}
    >
      <Container
        className={cx(styles.container, !isOpen && shrink && styles.smaller)}
      >
        <a className={styles.skipLink} href="#main">
          Skip to main content
        </a>
        <Logo className={styles.logo} onCloseMenu={() => setOpen(false)} />
        <div className={cx(styles.navWrap, isOpen && styles.open)}>
          <Nav routes={story?.content.routes} />
          <div className={cx(locale === "ar" && styles.langWrapperArabic)}>
            <LangToggle
              className={styles.lang}
              onCloseMenu={() => setOpen(false)}
              contentLocales={contentLocales}
            />
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <ul>
                {story?.content?.bottom_links?.map((route) => (
                  <li
                    key={route._uid}
                    className={cx(locale === "ar" && styles.noRightMargin)}
                  >
                    <LinkWrap href={route.href?.cached_url}>
                      {route.label}
                    </LinkWrap>
                  </li>
                ))}
              </ul>
              <div className={styles.icons}>
                <LinkWrap href="/">
                  <LinkedIn />
                </LinkWrap>
                <LinkWrap href="/">
                  <Instagram />
                </LinkWrap>
                <LinkWrap href="/">
                  <Twitter />
                </LinkWrap>
              </div>
            </div>
            <div className={styles.right}>
            </div>
          </div>
        </div>
        <div className={styles.menuWrap}>
          <MenuIcon
            active={isOpen}
            className={styles.mobileNavBtn}
            onClick={() => {
              setOpen(!isOpen);
            }}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
