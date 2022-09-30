import React, { FC } from "react";
import Container from "components/Layout/Container";
import Button from "components/common/Button/Button";

export type ErrorPageProps = Record<string, never>;

const ErrorPage: FC<ErrorPageProps> = () => {
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

export default ErrorPage;
