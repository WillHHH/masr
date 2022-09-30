import type { FC } from "react";
import dynamic from "next/dynamic";
import { storyblokEditable, storyblokInit, apiPlugin } from "@storyblok/react";

const GenericGridItemBlok = dynamic(() => import("bloks/GenericGridItemBlok"));
const LogoAnimationSectionBlok = dynamic(
  () => import("bloks/LogoAnimationSection"),
);
const HomePageHeroBlok = dynamic(() => import("bloks/HomePageHero"));
const Page = dynamic(() => import("bloks/Page"));
const Button = dynamic(() => import("bloks/Button"));
const FourOhFour = dynamic(() => import("components/common/404/404"));
const Header = dynamic(() => import("components/Shell/Header/Header"));
const Footer = dynamic(() => import("components/Shell/Footer/Footer"));
const SectionDividerBlok = dynamic(() => import("bloks/SectionDivider"));

function withDynamicBlok(DynamicComponent) {
  const Component: FC<{ blok: any }> = ({ blok }) => {
    if (!blok) {
      return <FourOhFour />;
    } else {
      Component.displayName = blok.component;
      return (
        <div {...storyblokEditable(blok)} key={blok._uid}>
          <DynamicComponent blok={blok} />
        </div>
      );
    }
  };
  return Component;
}

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  // bridge: true,
  use: [apiPlugin],
  components: {
    page: Page,
    button: withDynamicBlok(Button),
    logo_animation_section: withDynamicBlok(LogoAnimationSectionBlok),
    home_page_hero: withDynamicBlok(HomePageHeroBlok),
    generic_grid_item: withDynamicBlok(GenericGridItemBlok),
    header: withDynamicBlok(Header),
    footer: withDynamicBlok(Footer),
    section_divider: withDynamicBlok(SectionDividerBlok),
  },
});
