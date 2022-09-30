import React from "react";
import BackToTop from "./BackToTop";

export default {
  title: "Components/BackToTop",
  component: BackToTop,
};

const Template = (args) => <BackToTop {...args} />;

export const standard = Template.bind({});
standard.args = {};
