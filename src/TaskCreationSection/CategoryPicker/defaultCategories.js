import { v4 as uuid } from "uuid";

const defaultCategories = [
  {
    name: "general",
    icon: "AiFillWallet",
    colorStyle: "info",
    isAddedByUser: false,
    uuid: uuid(),
  },
  {
    name: "hobby",
    icon: "AiFillHeart",
    colorStyle: "error",
    isAddedByUser: false,
    uuid: uuid(),
  },
  {
    name: "activities",
    icon: "BsActivity",
    colorStyle: "success",
    isAddedByUser: false,
    uuid: uuid(),
  },
  {
    name: "work",
    icon: "MdWork",
    colorStyle: "primary",
    isAddedByUser: false,
    uuid: uuid(),
  },
  {
    name: "school",
    icon: "IoSchoolSharp",
    colorStyle: "warning",
    isAddedByUser: false,
    uuid: uuid(),
  },
];

export default defaultCategories;
