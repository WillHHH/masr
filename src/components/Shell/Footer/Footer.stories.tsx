import React from "react";
import Footer from "./Footer";

export default {
  title: "Shell/Footer",
  component: Footer,
};

const Template = (args) => {
  return <Footer {...args} />;
};

export const standard = Template.bind({});
standard.args = {};
