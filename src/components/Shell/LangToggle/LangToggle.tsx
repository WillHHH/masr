import React, { FC, useState } from "react";
import cx from "classnames";
import styles from "./LangToggle.module.scss";
import { useRouter } from "next/router";
import { SwitchLocaleContext } from "pages/_app";
import Icon from "components/common/Icon/Icon";

import langs from "./langs.json";

type LangToggleProps = {
  className?: string;
  onCloseMenu?: () => void;
  contentLocales: string[];
};

const LangToggle: FC<LangToggleProps> = ({
  className,
  onCloseMenu,
  contentLocales,
}) => {
  const [isActive, setActive] = useState(false);
  const { locale, locales } = useRouter();

  return (
    <SwitchLocaleContext.Consumer>
      {(switchLocale) => (
        <div className={cx(styles.base, isActive && styles.active, className)}>
          <div className={styles.selector} onClick={() => setActive(!isActive)}>
            <span className={styles.lang}>{langs[locale] || "en"}</span>
            <Icon className={styles.icon} icon="chevron-down" />
          </div>
          <div className={styles.langOptions}>
            {locales?.map((l) => (
              <span
                className={cx(
                  styles.lang,
                  styles.option,
                  !contentLocales.includes(l) && styles.disabled,
                )}
                key={l}
                onClick={() => {
                  if (contentLocales.includes(l)) {
                    switchLocale(l);
                    setActive(false);
                    onCloseMenu();
                  }
                }}
              >
                {langs[l]}
              </span>
            ))}
          </div>
        </div>
      )}
    </SwitchLocaleContext.Consumer>
  );
};

export default LangToggle;
