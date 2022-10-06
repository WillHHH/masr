import React from "react";

const ScrollStory = ({ full = false }) => (
  <div
    style={{
      height: full ? "100vh" : "50vh",
      padding: 32,
      textAlign: "center",
    }}
  >
    Scroll
    <br />↓
  </div>
);

export default ScrollStory;
