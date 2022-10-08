import React from "react";
import InteriorMainPageHeader from "./InteriorMainPageHeader";

export default {
  title: "Components/InteriorMainPageHeader",
  component: InteriorMainPageHeader,
};

const Template = (args) => <InteriorMainPageHeader {...args} />;

export const standard = Template.bind({});
standard.args = {
  title: "services",
  content: "Chances are we have seen your situation before.",
  image:
    "https://www.citrix.com/content/dam/citrix61/en_us/images/photos/microsoft-office-teams.jpg",
};
