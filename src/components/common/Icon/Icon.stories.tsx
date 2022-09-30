import React from "react";
import Icon from "./Icon";

export default {
  title: "Basic/Icon",
  component: Icon,
};

const Template = (args) => (
  <>
    <Icon {...args} />
  </>
);

export const carousel = Template.bind({});
carousel.args = { icon: "carousel" };

export const play = Template.bind({});
play.args = { icon: "play" };

export const arrowDown = Template.bind({});
arrowDown.args = { icon: "arrowDown" };

export const arrowRight = Template.bind({});
arrowRight.args = { icon: "arrowRight" };

export const chevronLeft = Template.bind({});
chevronLeft.args = { icon: "chevronLeft" };

export const chevronRight = Template.bind({});
chevronRight.args = { icon: "chevronRight" };

export const chevronUp = Template.bind({});
chevronUp.args = { icon: "chevronUp" };

export const exitLink = Template.bind({});
exitLink.args = { icon: "exitLink" };

export const memoOpen = Template.bind({});
memoOpen.args = { icon: "memoOpen" };

export const menuClose = Template.bind({});
menuClose.args = { icon: "menuClose" };
