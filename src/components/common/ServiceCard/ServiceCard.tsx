import React, { FC } from "react";
import cx from "classnames";

import styles from "./ServiceCard.module.scss";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export type ServiceCardProps = {
  className?: string;
  number?: number;
  category?: "inventory" | "repair" | "warranty";
  title?: string;
  content?: string;
};

const ServiceCard: FC<ServiceCardProps> = ({
  className,
  number,
  category,
  title,
  content,
}) => {
  const renderIcon = () => {
    switch (category) {
      case "inventory":
        return <DirectionsCarIcon />;
      case "repair":
        return <TireRepairIcon />;
      case "warranty":
        return <WorkspacePremiumIcon />;
      default:
        break;
    }
  };

  return (
    <div className={cx(styles.base, className)}>
      <span>{number}</span>
      {renderIcon()}
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default ServiceCard;
