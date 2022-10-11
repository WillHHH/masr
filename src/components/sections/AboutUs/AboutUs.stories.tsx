import React from "react";
import AboutUs from "./AboutUs";

export default {
  title: "Sections/About Us",
  component: AboutUs,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <AboutUs {...args} />;

export const Story = Template.bind({});
Story.args = {
  title: "We Provide Best Services",
  content:
    "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
};
