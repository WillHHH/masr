import React, { FC } from "react";
import cx from "classnames";

import styles from "./Typography.module.scss";

const typeStyles = [
  {
    className: styles["home-page-main"],
    wrap: styles.lightWrap,
    label: "We Help You Win the Conversation",
    info: "@include home-page-main",
  },
  {
    className: styles["interior-page-title"],
    wrap: styles.lightWrap,
    label: "About us",
    info: "@include interior-page-title",
  },
  {
    className: styles["section-divider"],
    wrap: styles.lightWrap,
    label: "Chances are we have seen your situation before.",
    info: "@include section-divider",
  },
  {
    className: styles["big-section-title"],
    wrap: styles.lightWrap,
    label: "Unlocking extraordinary",
    info: "@include big-section-title",
  },
  {
    className: styles["normal-section-title"],
    wrap: styles.lightWrap,
    label:
      "Newco is a leading global strategic communications and public affairs consultancy, helping clients navigate complex environments.",
    info: "@include normal-section-title",
  },
  {
    className: styles["normal-section-subtitle"],
    wrap: styles.lightWrap,
    label: "We understand that the only constant in your business is change.",
    info: "@include normal-section-subtitle",
  },
  {
    className: styles["paragraph"],
    wrap: styles.lightWrap,
    label:
      "Can we build a roadmap to conquer Multiple Sclerosis (MS), a disease that impacts more than 2 million globally as the leading non-traumatic disability disorder in young adults? How have lessons learnt so far shed light on broader neuroscience R&D?",
    info: "@include paragraph",
  },
  {
    className: styles["buttons"],
    wrap: styles.lightWrap,
    label: "opportunity",
    info: "@include buttons",
  },
  {
    className: styles["article-title"],
    wrap: styles.lightWrap,
    label:
      "No IPO without ESG: Every ESG aspect companies need to consider to make their IPO successful.",
    info: "@include article-title",
  },
  {
    className: styles["article-date-and-category"],
    wrap: styles.lightWrap,
    label: "March 23, 2022  | Latest",
    info: "@include article-date-and-category",
  },
  {
    className: styles["subtitles"],
    wrap: styles.lightWrap,
    label: "the team",
    info: "@include subtitles",
  },
  {
    className: styles["breadcrumbs"],
    wrap: styles.lightWrap,
    label: "the team",
    info: "@include breadcrumbs",
  },
  {
    className: styles["subtitles2"],
    wrap: styles.lightWrap,
    label:
      "Finsbury Glover Hering is a leading global communications consultancy, supporting clients around the globe as they navigate increasingly complex business, policy, political and cultural environments.",
    info: "@include subtitles2",
  },
  {
    className: styles["bullets"],
    wrap: styles.lightWrap,
    label: "10:30am - 12:30pm",
    info: "@include bullets",
  },
  {
    className: styles["bio-name"],
    wrap: styles.lightWrap,
    label: "XAmanda Jill KeatingXXXX",
    info: "@include bio-name",
  },
  {
    className: styles["bio-title"],
    wrap: styles.lightWrap,
    label: "Managing Director",
    info: "@include bio-title",
  },
];

const Typography: FC = () => {
  return (
    <div className={styles.base}>
      {typeStyles.map(({ className, label, info, wrap }) => (
        <div key={label} className={styles.typeStyle}>
          <div className={wrap}>
            <div className={cx(styles.typeStyle, className)}>{label}</div>
          </div>
          <div className={styles.info}>{info}</div>
        </div>
      ))}
    </div>
  );
};

export default Typography;
