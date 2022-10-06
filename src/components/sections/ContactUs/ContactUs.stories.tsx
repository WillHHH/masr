import React from "react";
import ContactUs from "./ContactUs";
import { contactInfo } from "data/mock/custom";

export default {
  title: "Sections/Contact Us",
  component: ContactUs,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <ContactUs {...args} />;

export const Story = Template.bind({});
Story.args = {
  title: "We Provide Best Services",
  content:
    "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
  contacts: contactInfo,
};
