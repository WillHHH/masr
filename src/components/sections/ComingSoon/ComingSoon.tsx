import React, { FC } from "react";
import cx from "classnames";
import styles from "./ComingSoon.module.scss";
import Reveal from "components/Layout/Reveal";
import Container from "components/Layout/Container";
import SectionTitle, {
  SectionTitleProps,
} from "components/common/SectionTitle/SectionTitle";

type ComingSoonProps = {
  className?: string;
};

const ComingSoon: FC<ComingSoonProps & SectionTitleProps> = ({
  className,
  title,
  content,
}) => {
  return (
    <div className={cx(styles.base, className)}>
      <Container>
        <Reveal>
          <SectionTitle className={styles.coming} title={title} content={content} />
        </Reveal>
      </Container>
    </div>
  );
};

export default ComingSoon;
