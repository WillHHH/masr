import GenericGridItem, {
  GenericGridItemProps,
} from "components/common/GenericGridItem/GenericGridItem";

const GenericGridItemBlok = ({ blok }) => {
  const props: GenericGridItemProps = {
    title: blok.title,
    text: blok.text,
    image: blok.image?.filename,
    href: blok.link?.cached_url,
    arrow: blok.arrow,
    button:
      !!blok.button && !!blok.button[0] && !!blok.link.cached_url
        ? {
            text: blok.button[0].label,
            type: blok.button[0].type,
            mode: blok.button[0].mode,
            href: blok.link.cached_url,
          }
        : undefined,
  };
  return <GenericGridItem {...props} />;
};

export default GenericGridItemBlok;
