import React from "react";
import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Standard = Template.bind({});
Standard.args = { text: "Button", type: "box", mode: "light" };
