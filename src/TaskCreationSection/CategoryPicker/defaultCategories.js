import { v4 as uuid } from "uuid";

const defaultCategories = [
  {
    name: "general",
    icon: "AiFillWallet",
    colorStyle: "info",
  },
  {
    name: "hobby",
    icon: "AiFillHeart",
    colorStyle: "error",
  },
  {
    name: "activities",
    icon: "BsActivity",
    colorStyle: "success",
  },
  {
    name: "work",
    icon: "MdWork",
    colorStyle: "primary",
  },
  {
    name: "school",
    icon: "IoSchoolSharp",
    colorStyle: "warning",
  },
].map((category) => ({ ...category, uuid: uuid(), isAddedByUser: false }));

export default defaultCategories;
