import Guides from "components/tools/Guides";
import ScrollStory from "components/tools/ScrollStory";
import React from "react";
import LogoAnimationSection, { LogoAnimationSectionProps } from "./index";

export default {
  title: "Sections/Logo Animation Section",
  component: LogoAnimationSection,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => (
  <>
    <ScrollStory full />
    <LogoAnimationSection {...args} />
    <ScrollStory full />
    <Guides />
  </>
);

export const Story = Template.bind({});
const args: LogoAnimationSectionProps = {
  title: "This is <i>the title</i>",
  content:
    "<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, magnam maiores itaque at deserunt, praesentium, quaerat nulla ut sunt sapiente perferendis molestias rem! Obcaecati voluptates vel repellat dicta incidunt perferendis.</p>",
};
Story.args = args;
