import React from "react";
import ServicesSection from "./WhatWeDo";
import { serviceCards } from "data/mock/custom";

export default {
  title: "Sections/Services Section",
  component: ServicesSection,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <ServicesSection {...args} />;

export const Story = Template.bind({});
Story.args = {
  title: "We Provide Best Services",
  content:
    "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
  cards: serviceCards,
};
