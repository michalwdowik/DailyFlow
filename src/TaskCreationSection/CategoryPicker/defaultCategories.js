import { v4 as uuid } from "uuid";

const defaultCategories = [
  {
    name: "general",
    icon: "IoDocuments",
    colorStyle: "info",
  },
  {
    name: "hobby",
    icon: "IoHeart",
    colorStyle: "error",
  },
  {
    name: "activities",
    icon: "IoPulse",
    colorStyle: "success",
  },
  {
    name: "work",
    icon: "IoLaptop",
    colorStyle: "primary",
  },
  {
    name: "school",
    icon: "IoSchool",
    colorStyle: "warning",
  },
].map((category) => ({ ...category, uuid: uuid(), isAddedByUser: false }));

export default defaultCategories;
