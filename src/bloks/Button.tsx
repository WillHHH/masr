import React from "react";
import Button from "components/common/Button/Button";

const ButtonBlok = ({ blok }) => {
  const { label, ...props } = blok;

  return <Button text={label} {...props} />;
};

export default ButtonBlok;
