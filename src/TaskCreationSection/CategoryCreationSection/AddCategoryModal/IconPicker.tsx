/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/require-default-props */

import { memo, useMemo } from 'react'
import { IconContext } from '@react-icons/all-files'
import { IoHappy } from '@react-icons/all-files/io5/IoHappy'
import iconList from '../../../Helpers/iconList'

type IconPickerProps = {
    newCategoryIcon: string
    setNewCategoryIcon: (categoryIcon: string) => void
}
const IconPicker = memo(
    ({ newCategoryIcon, setNewCategoryIcon }: IconPickerProps): JSX.Element => {
        const iconContextValue = useMemo(
            () => ({
                size: '3em',
                display: 'flex',
                color: '#334155',
            }),
            []
        )
        return (
            <IconContext.Provider value={iconContextValue}>
                <div className="flex-none collapse max-h-60 rounded-3xl">
                    <input type="checkbox" className="peer " />
                    <SelectedIcon iconName={newCategoryIcon} />
                    <div className="relative p-0 m-0 overflow-auto collapse-content place-items-center accent-slate-700">
                        <div className="flex flex-wrap justify-center mt-3 ">
                            <Icons setNewCategoryIcon={setNewCategoryIcon} />
                        </div>
                    </div>
                </div>
            </IconContext.Provider>
        )
    }
)

type IconType = keyof typeof iconList

type IconsProps = {
    setNewCategoryIcon: (iconName: string) => void
}

const defaultIcons = [
    'IoDocuments',
    'IoHeart',
    'IoPulse',
    'IoLaptop',
    'IoSchool',
]

const Icons = memo(({ setNewCategoryIcon }: IconsProps): JSX.Element => {
    const memoizedIcons = useMemo(() => {
        return Object.entries(iconList).filter(([name]) => {
            return !defaultIcons.includes(name)
        })
    }, [])

    return (
        <>
            {memoizedIcons.map(([name, Icon]) => (
                <button
                    className="px-3 text-5xl transition-all ease-in-out text-slate-600 hover:opacity-75 focus:scale-125"
                    type="button"
                    key={name}
                    onClick={() => setNewCategoryIcon(name)}
                >
                    <Icon />
                </button>
            ))}
        </>
    )
})

type SelectedIconProps = {
    iconName: string
}

const SelectedIcon = ({ iconName }: SelectedIconProps): JSX.Element => (
    <button
        className="self-center p-0 m-0 text-5xl transition ease-in-out text-slate-600 collapse-title peer-checked:scale-75 peer-checked:overflow-scroll"
        type="button"
    >
        <DynamicIcon name={iconName} />
    </button>
)

type DynamicIconProps = {
    name: string
}

export const DynamicIcon = ({ name }: DynamicIconProps): JSX.Element => {
    const Icon = iconList[name as IconType]

    if (!Icon) {
        return <IoHappy />
    }
    return <Icon />
}

export default memo(IconPicker)
