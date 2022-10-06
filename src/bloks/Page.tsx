import React from "react";
import { StoryblokComponent } from "@storyblok/react";

const Page = ({ blok }) => (
  <main data-content-type="Page">
    {blok.body
      ? blok.body.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))
      : null}
  </main>
);

export default Page;
