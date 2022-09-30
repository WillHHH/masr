import React, { FC } from "react";
import cx from "classnames";
import styles from "./404.module.scss";
import Container from "components/Layout/Container";
import Button from "../Button/Button";

export type FourOhFourProps = {
  className?: string;
};

const FourOhFour: FC<FourOhFourProps> = ({ className }) => {
  return (
    <div className={cx(styles.base, className)}>
      <Container>
        <h1>Page Not Found</h1>
        <Button text="Home" href="/" />
      </Container>
    </div>
  );
};

export default FourOhFour;
