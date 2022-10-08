import InteriorMainPageHeader from "components/sections/InteriorMainPageHeader/InteriorMainPageHeader";

const InteriorMainPageHeaderBlok = ({ blok }) => {
  const { ...props } = blok;
  return <InteriorMainPageHeader {...props} />;
};

export default InteriorMainPageHeaderBlok;
