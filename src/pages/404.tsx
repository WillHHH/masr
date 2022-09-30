import React, { FC } from "react";
import FourOhFour from "components/common/404/404";

export type ErrorPageProps = Record<string, never>;

const ErrorPage: FC<ErrorPageProps> = () => {
  return <FourOhFour />;
};

export default ErrorPage;
