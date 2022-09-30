import HomePageHero from "components/sections/HomePageHero/HomePageHero";

const HomePageHeroBlok = ({ blok }) => {
  const { image, link, ...props } = blok;
  return <HomePageHero image={image.filename} href={link} {...props} />;
};

export default HomePageHeroBlok;
