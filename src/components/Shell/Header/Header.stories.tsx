import React from "react";
import Header from "./Header";

export default {
  title: "Shell/Header",
  component: Header,
};

const Template = (args) => {
  return <Header {...args} />;
};

export const standard = Template.bind({});
standard.args = {};
