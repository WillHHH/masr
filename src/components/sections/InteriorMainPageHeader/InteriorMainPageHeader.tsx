import React, { useContext } from "react";
import cx from "classnames";
import styles from "./InteriorMainPageHeader.module.scss";
import Container from "components/Layout/Container";
// import Breadcrumbs from "components/common/Breadcrumbs/Breadcrumbs";
import { useRouter } from "next/router";
import useScrollOffset from "util/hooks/useScrollOffset";
import { ConfigContext } from "components/Shell/ConfigContext";
import { motion } from "framer-motion";
import { getMotionProps } from "util/animation";

type InteriorMainPageHeaderProps = {
  className?: string;
  title: string;
  previousRoute?: string;
};

const categoryGreenList = [
  "list",
  "news",
  "award-wins",
  "recent-hires",
  "elections",
];

const InteriorMainPageHeader = ({
  className,
  title,
  previousRoute,
}: InteriorMainPageHeaderProps) => {
  const router = useRouter();
  const headerContext = useContext(ConfigContext);

  // const theme =
  //   router.asPath === "/"
  //     ? headerContext?.header?.story.content.route_images.find(
  //         (img) => img.title === "home",
  //       )
  //     : headerContext?.header?.story.content.route_images.find((img) =>
  //         router.asPath.includes(img.title),
  //       );

  // const image = theme?.filename;
  const slugsArray = router?.query?.slug && Array.from(router.query.slug);
  let routeLevel = Math.min(
    slugsArray?.filter((item) => item !== "index")?.length,
    3,
  );

  // HACK: Figure out something better when we do proper categories for insights
  if (
    router.asPath.startsWith("/insights/") &&
    !categoryGreenList.find((cat) =>
      router.asPath.startsWith("/insights/" + cat),
    ) &&
    routeLevel === 2
  ) {
    routeLevel = 3;
  }

  const [scrollPosition] = useScrollOffset();
  const bgOffset = -Math.round(scrollPosition / 3);

  return (
    <div
      className={cx(
        styles.base,
        routeLevel < 2 && styles.useImage,
        routeLevel < 3 && styles.dark,
        className,
      )}
      style={{
        backgroundPosition: routeLevel < 2 && `center ${bgOffset}px`,
        backgroundColor: routeLevel < 3 && `rgb(${headerContext?.headerColor})`,
      }}
    >
      <Container className={styles.container}>
        <motion.div {...getMotionProps({ order: 1 })}>
          {/* <Breadcrumbs
            dark={routeLevel < 3}
            previousRoute={previousRoute}
            shellData={headerContext?.header?.story.content.routes}
          /> */}
          <h1 className={styles.title}>{title}</h1>
        </motion.div>
      </Container>
    </div>
  );
};

export default InteriorMainPageHeader;
