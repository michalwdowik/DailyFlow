/* eslint-disable react/display-name */

import { memo, useMemo } from 'react'
import iconList from '../../../helpers/iconList'
import {
    IconPickerProps,
    IconProps,
    IconsProps,
} from '../../../types/IconTypes'

const IconPicker = memo(
    ({ newCategoryIcon, setNewCategoryIcon }: IconPickerProps): JSX.Element => {
        return (
            <div className="flex-none collapse max-h-60 rounded-3xl">
                <input type="checkbox" className="peer " />
                <SelectedIcon name={newCategoryIcon} />
                <div className="relative p-0 m-0 overflow-auto collapse-content place-items-center accent-slate-700">
                    <div className="flex flex-wrap justify-center mt-3 ">
                        <Icons setNewCategoryIcon={setNewCategoryIcon} />
                    </div>
                </div>
            </div>
        )
    }
)

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

const SelectedIcon = ({ name }: IconProps): JSX.Element => (
    <button
        className="self-center p-0 m-0 text-5xl transition ease-in-out text-slate-600 collapse-title peer-checked:scale-75 peer-checked:overflow-scroll"
        type="button"
    >
        <DynamicIcon name={name} />
    </button>
)

export const DynamicIcon = ({ name }: IconProps): JSX.Element => {
    const Icon = iconList[name]

    if (!Icon) {
        const DefaultIcon = iconList.IoHappy
        if (DefaultIcon) {
            return <DefaultIcon />
        }
        throw new Error('Default icon not found')
    }
    return <Icon />
}

export default memo(IconPicker)
