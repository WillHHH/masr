import React from "react";
import LangToggle from "./LangToggle";

export default {
  title: "Shell/LangToggle",
  component: LangToggle,
};

const Template = (args) => {
  return <LangToggle {...args} />;
};

export const standard = Template.bind({});
standard.args = {};
