import React from "react";
import GenericGridItem from "./GenericGridItem";

export default {
  title: "Components/GenericGridItem",
  component: GenericGridItem,
};

const Template = (args) => <GenericGridItem {...args} />;

export const standard = Template.bind({});
standard.args = {
  date: "FEB 3, 2022",
  title:
    "Merged Finsbury Glover Hering and SVC Rank #1 Globally in 2021 M&A Deal Count and Value",
  image:
    "https://www.citrix.com/content/dam/citrix61/en_us/images/photos/microsoft-office-teams.jpg",
};
