import { useRouter } from "next/router";
import cx from "classnames";

import LinkWrap from "components/common/LinkWrap/LinkWrap";

import styles from "./Nav.module.scss";

export type TRoute = {
  _uid: string;
  label: string;
  href: any;
  subItems?: TRoute[];
};

type NavProps = {
  className?: string;
  isMenuOpen?: boolean;
  routes?: TRoute[];
};

const Nav = ({ className, isMenuOpen, routes }: NavProps) => {
  const router = useRouter();
  return (
    <ul className={cx(styles.base, className, isMenuOpen && styles.menuOpen)}>
      {routes?.map((route) => {
        const href: string = route.href?.cached_url || "";
        return (
          <li key={route._uid} className={styles.href}>
            <LinkWrap
              className={cx(
                styles.link,
                (router.asPath + "/").startsWith(route.href?.cached_url) &&
                  styles.active,
              )}
              href={href}
            >
              {route.label}
            </LinkWrap>
          </li>
        );
      })}
    </ul>
  );
};

export default Nav;
