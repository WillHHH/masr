import type { FC, ReactNode } from "react";
import cx from "classnames";
import Link from "next/link";
import { isAbsoluteUrl } from "util/helper";
import { useRouter } from "next/router";

import styles from "./LinkWrap.module.scss";

export type LinkWrapProps = {
  href?: string;
  tabIndex?: number;
  locale?: string;
  ariaLabel?: string;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e) => void;
  children?: ReactNode;
};

/* Wrap in Next.js Link if on-site */
const LinkWrap: FC<LinkWrapProps> = ({
  href,
  tabIndex,
  locale,
  children,
  ariaLabel,
  className,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const route = useRouter();
  const otherProps = {
    tabIndex,
    onFocus,
    onBlur,
    onKeyDown,
    className: cx(styles.base, className),
  };
  href = href?.startsWith("/") && href !== "/" ? href.substring(1) : href;
  if (href) {
    return isAbsoluteUrl(href) ? (
      <a
        aria-label={ariaLabel}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...otherProps}
      >
        {children}
      </a>
    ) : (
      <Link
        locale={href?.startsWith("en/") ? "en" : locale || route.locale}
        href={href?.startsWith("en/") ? href.slice(3) : href}
      >
        <a aria-label={ariaLabel && ariaLabel} {...otherProps}>
          {children}
        </a>
      </Link>
    );
  } else {
    return <div {...otherProps}>{children}</div>;
  }
};

export default LinkWrap;
