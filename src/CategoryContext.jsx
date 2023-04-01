import { createContext, useMemo, useState, useContext } from "react";
import { v4 as uuid } from "uuid";

const CategoryContext = createContext({
  colorStyle: "info"
});

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
].map((category) => ({
  ...category,
  uuid: uuid(),
  isAddedByUser: false,
}));

export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(defaultCategories);

  const removeCategory = (uuid) => {
    setCategories(categories.filter((category) => !category.isAddedByUser || category.uuid !== uuid))
  }

  const addCategory = (category) => {
    setCategories([...categories, category])
  }

  const value = useMemo(() => ({
    categories,
    removeCategory,
    addCategory
  }), [categories])

  return (
    <CategoryContext.Provider value={value}>
      {children}
      </CategoryContext.Provider>
  )
}


export const useCategoryContext = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw Error('You`re missing CategoryContextProvider')
  }
  return context
}