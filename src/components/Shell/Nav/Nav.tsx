import { useRouter } from "next/router";
import cx from "classnames";

import LinkWrap from "components/common/LinkWrap/LinkWrap";
import { useWindowSize } from "usehooks-ts";

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
  onClose?: () => void;
};

const Nav = ({ className, isMenuOpen, routes, onClose }: NavProps) => {
  const router = useRouter();
  const { width: viewportWidth = 0 } = useWindowSize();

  return (
    <ul className={cx(styles.base, className, isMenuOpen && styles.menuOpen)}>
      {routes?.map((route) => {
        return (
          <li key={route.label} className={styles.href}>
            <LinkWrap
              className={cx(
                styles.link,
                (router.asPath + "/").startsWith(route.href.cached_url) &&
                  styles.active,
              )}
              href={route.href.cached_url}
              onClick={() => viewportWidth <= 970 && onClose()}
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
