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

const Nav = ({ className, isMenuOpen, routes }: NavProps) => {
  const router = useRouter();

  const handleClick = (e, id) => {
    e.preventDefault();
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ul className={cx(styles.base, className, isMenuOpen && styles.menuOpen)}>
      {mockedRoutes?.map((route) => {
        return (
          <li key={route.label} className={styles.href}>
            <LinkWrap
              className={cx(
                styles.link,
                (router.asPath + "/").startsWith(route.href) && styles.active,
              )}
              href={route.href}
              onClick={(e) => handleClick(e, route.href.slice(2))}
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
