import React from "react";
import SectionTitle from "./ServiceCard";

export default {
  title: "Components/Service Card",
  component: SectionTitle,
};

const Template = (args) => <SectionTitle {...args} />;

export const Story = Template.bind({});
Story.args = {
  number: 1,
  category: "inventory",
  title: "Inventory",
  content:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod",
};
