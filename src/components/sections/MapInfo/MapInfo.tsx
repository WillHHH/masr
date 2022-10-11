import React, { FC } from "react";
import cx from "classnames";
import styles from "./MapInfo.module.scss";
import Reveal from "components/Layout/Reveal";
import Container from "components/Layout/Container";
import GoogleMapReact from "google-map-react";
import moment from "moment";

type ContactUsProps = {
  className?: string;
  contacts?: any;
};

const MapInfo: FC<ContactUsProps> = ({ className }) => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  const hours = [
    {
      day: "Mon",
      hour: "11am - 5:30pm",
    },
    {
      day: "Tue",
      hour: "11am - 5:30pm",
    },
    {
      day: "Wed",
      hour: "11am - 5:30pm",
    },
    {
      day: "Thu",
      hour: "11am - 5:30pm",
    },
    {
      day: "Fri",
      hour: "11am - 5:30pm",
    },
    {
      day: "Sat",
      hour: "12pm - 5pm",
    },
    {
      day: "Sun",
      hour: "Closed",
    },
  ];

  return (
    <div className={styles.outer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA16d9FJFh__vK04jU1P64vnEpPc3jenec" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
      <Container className={cx(styles.base, className)}>
        <Reveal className={styles.info}>
          <h3>GET IN TOUCH</h3>
          <p>Contact us at</p>
          <h2>347-265-9189</h2>
          <div className={styles.hours}>
            {hours.map((v, i) => (
              <div
                key={i}
                className={moment().format("ddd") === v.day && styles.bold}
              >
                <span>{v.day}</span>
                <span>{v.hour}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </div>
  );
};

export default MapInfo;
