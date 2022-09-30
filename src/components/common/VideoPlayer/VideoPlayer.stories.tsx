import React from "react";
import VideoPlayer from "./VideoPlayer";

export default {
  title: "Components/VideoPlayer",
  component: VideoPlayer,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <VideoPlayer {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  videoId: "704151810",
};
