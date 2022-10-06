export * from "./";
import { ServiceCardProps } from "components/common/ServiceCard/ServiceCard";

export const serviceCards: ServiceCardProps[] = [
  {
    category: "inventory",
    title: "Inventory",
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod",
  },
  {
    category: "repair",
    title: "Repair",
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod",
  },
  {
    category: "warranty",
    title: "Warranty",
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod",
  },
];

export const contactInfo = [
  {
    type: "location",
    content: "<p><b>Stony Brook: </b>30 Doyle St Ste4, <br/>St James, NY 11780</p>",
  },
  {
    type: "hour",
    content: "<p><b>Mon-Fri: </b>11am - 5:30pm</p><p><b>Sat: </b>12am - 5pm</p>",
  },
  {
    type: "phone",
    content: "<p><b>Phone: </b>6315909196</p>",
  },
  {
    type: "wechat",
    content: "<p><b>WeChat: </b>nysrautogroup</p>",
  },
];
