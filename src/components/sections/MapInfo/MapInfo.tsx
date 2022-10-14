import React, { FC } from "react";
import cx from "classnames";
import styles from "./MapInfo.module.scss";
import Reveal from "components/Layout/Reveal";
import Container from "components/Layout/Container";
import { useRouter } from "next/router";

type ContactUsProps = {
  className?: string;
  contacts?: any;
};

const MapInfo: FC<ContactUsProps> = ({ className }) => {
  const { locale } = useRouter();

  const hours = [
    {
      day: "Mon-Fri",
      hour: "11am-5:30pm",
    },
    {
      day: "Sat",
      hour: "12pm-5pm",
    },
    {
      day: "Sun",
      hour: "Closed",
    },
  ];

  return (
    <div className={styles.outer}>
      <div className={styles.mapouter}>
        <div className={styles.gmap_canvas}>
          <iframe
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=30%20Doyle%20St%20Ste4,%20St%20James,%20NY%2011780&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
          ></iframe>
          <a href="https://123movies-to.org"></a>
          <br />
          <a href="https://www.embedgooglemap.net"></a>
        </div>
      </div>
      <Container className={cx(styles.base, className)}>
        <Reveal className={styles.info}>
          <h3>{locale === "zh" ? "联系我们" : "GET IN TOUCH"}</h3>
          <h2>
            <a href="tel:6315909196">631-590-9196</a>
          </h2>
          <div className={styles.hours}>
            {hours.map((v, i) => (
              <div key={i}>
                <span>{v.day}</span>
                <span>{v.hour}</span>
              </div>
            ))}
          </div>
          <img src="/images/wechat.jpeg" alt="QRcode" />
        </Reveal>
      </Container>
    </div>
  );
};

export default MapInfo;
