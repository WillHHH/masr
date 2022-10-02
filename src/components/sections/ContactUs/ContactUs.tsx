import React, { FC } from "react";
import cx from "classnames";
import styles from "./ContactUs.module.scss";
import Reveal from "components/Layout/Reveal";
import Container from "components/Layout/Container";
import SectionTitle, {
  SectionTitleProps,
} from "components/common/SectionTitle/SectionTitle";
import RoomIcon from "@mui/icons-material/Room";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

type ContactUsProps = {
  className?: string;
  contacts?: any;
};

const ContactUs: FC<ContactUsProps & SectionTitleProps> = ({
  className,
  title,
  content,
  contacts,
}) => {
  const renderIcon = (type) => {
    switch (type) {
      case "location":
        return <RoomIcon />;
      case "hour":
        return <AvTimerIcon />;
      case "phone":
        return <PhoneIphoneIcon />;
      case "wechat":
        return <img src="/images/wechat.jpeg" />;
      default:
        break;
    }
  };

  return (
    <div className={styles.outer}>
      <Container className={cx(styles.base, className)}>
        <a id="contact-us" className={styles.anchor} />
        <Reveal>
          <SectionTitle title={title} content={content} />
        </Reveal>
        <Reveal className={styles.contacts}>
          {contacts?.map((v, i) => (
            <div key={i}>
              <div className={styles.asset}>{renderIcon(v.type)}</div>
              <div
                className={styles.info}
                dangerouslySetInnerHTML={{
                  __html: v.content,
                }}
              />
            </div>
          ))}
        </Reveal>
      </Container>
    </div>
  );
};

export default ContactUs;
