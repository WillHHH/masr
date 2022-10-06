import React, { FC } from "react";
import cx from "classnames";
import Link from "next/link";

import styles from "./Logo.module.scss";

type LogoProps = {
  className?: string;
  dark?: boolean;
  onCloseMenu?: () => void;
};

const Logo: FC<LogoProps> = ({ className, onCloseMenu }) => {
  return (
    <Link href="/">
      <a>
        <img
          className={cx(styles.base, className)}
          src="/images/logo@2x.png"
          // srcSet="/images/logo.png 1x, /images/logo@2x.png 2x, /images/logo@3x.png 3x"
          width="250"
          height="115"
          alt="SR LOGO"
          onClick={onCloseMenu}
        />
      </a>
    </Link>
  );
};

export default Logo;
