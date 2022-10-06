import React from "react";
import SectionDivider from "./index";

export default {
  title: "Basic/Section Divider",
  component: SectionDivider,
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
    <SectionDivider {...args} />
    {block}
  </>
);

export const Story = Template.bind({});
Story.args = {
  mode: "light",
  spacing: "medium",
  contain: true,
};
