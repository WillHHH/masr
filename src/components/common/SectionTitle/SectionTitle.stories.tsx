import React from "react";
import SectionTitle from "./SectionTitle";

export default {
  title: "Components/Section Title",
  component: SectionTitle,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
    },
  },
};

const block = <div style={{ height: 200, background: "lightgrey" }} />;

const Template = (args) => (
  <>
    {block}
    <SectionTitle {...args} />
    {block}
  </>
);

export const Story = Template.bind({});
Story.args = {
  title: "Services",
  content:
    "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
};
