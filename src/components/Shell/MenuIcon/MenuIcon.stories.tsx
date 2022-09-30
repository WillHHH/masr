import React, { useState } from "react";
import MenuIcon from "./MenuIcon";

export default {
  title: "Components/MenuIcon",
  component: MenuIcon,
};

const Template = (args) => {
  const [isActive, setActive] = useState(false);

  return (
    <>
      <MenuIcon {...args} isActive={isActive} setActive={setActive} />
    </>
  );
};

export const standard = Template.bind({});
standard.args = {};
