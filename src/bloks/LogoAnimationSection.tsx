import LogoAnimationSection, {
  LogoAnimationSectionProps,
} from "components/sections/LogoAnimationSection";
import { useStoryblokApi } from "@storyblok/react";

const LogoAnimationSectionBlok = ({ blok }) => {
  const sbApi = useStoryblokApi();
  const componentProps: LogoAnimationSectionProps = {
    title: sbApi.richTextResolver.render(blok.title),
    content: sbApi.richTextResolver.render(blok.content),
  };
  return <LogoAnimationSection {...componentProps} />;
};

export default LogoAnimationSectionBlok;
