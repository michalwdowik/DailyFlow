import iconList from '../helpers/iconList'

export type IconPickerProps = {
    newCategoryIcon: IconType
    setNewCategoryIcon: (categoryIcon: IconType) => void
}

export type IconProps = {
    name: IconType
}

export type IconType = keyof typeof iconList

export type IconsProps = {
    setNewCategoryIcon: (iconName: IconType) => void
}
