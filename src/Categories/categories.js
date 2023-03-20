import { v4 as uuid } from "uuid";

const uniqueID1 = uuid();
const uniqueID2 = uuid();
const uniqueID3 = uuid();
const uniqueID4 = uuid();
const uniqueID5 = uuid();

const categories = [
  {
    name: "general",
    icon: "AiFillWallet",
    colorStyle: "info",
    isAddedByUser: false,
    uuid: uniqueID1,
  },
  {
    name: "hobby",
    icon: "AiFillHeart",
    colorStyle: "error",
    isAddedByUser: false,
    uuid: uniqueID2,
  },
  {
    name: "activities",
    icon: "BsActivity",
    colorStyle: "success",
    isAddedByUser: false,
    uuid: uniqueID3,
  },
  {
    name: "work",
    icon: "MdWork",
    colorStyle: "primary",
    isAddedByUser: false,
    uuid: uniqueID4,
  },
  {
    name: "school",
    icon: "IoSchoolSharp",
    colorStyle: "warning",
    isAddedByUser: false,
    uuid: uniqueID5,
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
