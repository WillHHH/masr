import React from "react";
import HomePageHero from "./HomePageHero";

export default {
  title: "Components/HomePageHero",
  component: HomePageHero,
};

const Template = (args) => <HomePageHero {...args} />;

export const standard = Template.bind({});
standard.args = {
  cta: "learn more",
  href: "/",
  title: "Chances are we have seen your situation before.",
  image:
    "https://www.citrix.com/content/dam/citrix61/en_us/images/photos/microsoft-office-teams.jpg",
};
