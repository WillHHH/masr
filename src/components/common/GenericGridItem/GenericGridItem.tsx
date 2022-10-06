import React, { FC, useState } from "react";
import styles from "./GenericGridItem.module.scss";
import cx from "classnames";
import LinkWrap from "components/common/LinkWrap/LinkWrap";
import type { Richtext } from "storyblok-js-client";
import { useStoryblokApi } from "@storyblok/react";
import Button from "../Button/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactComponent as ArrowIcon } from "images/icons/icon-arrow-short-right.svg";

export type GenericGridItemProps = {
  title: string;
  text: Richtext;
  image?: string;
  href: string;
  arrow?: boolean;
  className?: string;
  button?: {
    text: string;
    type: "pill" | "ghost" | "back" | "box";
    mode: "light" | "dark";
    href: string;
  };
};

const GenericGridItem: FC<GenericGridItemProps> = ({
  title,
  text,
  image,
  href,
  arrow = false,
  className,
  button,
}) => {
  const sbApi = useStoryblokApi();
  const html = sbApi.richTextResolver.render(text);
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const { locale } = router;

  return (
    <LinkWrap
      href={!!button ? undefined : href}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div
        className={cx(
          styles.base,
          !!href && !button && styles.hasLink,
          !!href && focused && styles.focused,
          className,
        )}
      >
        {image && (
          <div className={styles.img}>
            <Image src={image} width="379" height="200" objectFit="cover" />
          </div>
        )}
        {!!title && (
          <h3 className={styles.title}>
            {title}
            <ArrowIcon
              className={cx(
                (href || arrow) && !button ? styles.arrow : styles.hide,
                locale === "ar" && styles.arrowRotated,
              )}
            />
          </h3>
        )}
        {!!text && (
          <div
            className={cx(
              styles.text,
              locale === "ar" && styles.arabicListStyle,
            )}
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        )}
        {!!button && <Button {...button} className={styles.button} />}
      </div>
    </LinkWrap>
  );
};

export default GenericGridItem;
