import { v4 as uuid } from "uuid";

export const categories = [
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

export const clearCategoriesList = () => {
  categories.length = 0;
};

export const removeCategory = (id) => {
  let newArray = categories;
  newArray = categories.filter((category) => {
    return category.uuid !== id;
  });
  clearCategoriesList();
  newArray.forEach((el) => {
    categories.push(el);
  });
};

export default categories;
