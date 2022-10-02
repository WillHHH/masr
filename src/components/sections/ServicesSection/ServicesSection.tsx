import React, { FC } from "react";
import cx from "classnames";
import styles from "./ServicesSection.module.scss";
import Container from "components/Layout/Container";
import Reveal from "components/Layout/Reveal";
import ServiceCard, {
  ServiceCardProps,
} from "components/common/ServiceCard/ServiceCard";
import SectionTitle, {
  SectionTitleProps,
} from "components/common/SectionTitle/SectionTitle";

type ServicesSectionProps = {
  className?: string;
  cards?: ServiceCardProps[];
};

const ServicesSection: FC<ServicesSectionProps & SectionTitleProps> = ({
  className,
  cards,
  title,
  content,
}) => {
  return (
    <Container className={cx(styles.base, className)}>
      <a id="services" className={styles.anchor} />
      <SectionTitle title={title} content={content} />
      <Reveal className={styles.cards}>
        {cards?.map((v, i) => (
          <ServiceCard key={i} number={i + 1} {...v} />
        ))}
      </Reveal>
    </Container>
  );
};

export default ServicesSection;
