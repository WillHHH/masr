import React, { FC } from "react";
import Container from "components/Layout/Container";
import Button from "components/common/Button/Button";

export type ErrorProps = Record<string, never>;

const Error: FC<ErrorProps> = () => {
  return (
    <Container>
      <h1>An Error Occurred</h1>
      <Button
        text="Home"
        onClick={() => {
          window.location.assign("/");
        }}
      />
    </Container>
  );
};

export default Error;
