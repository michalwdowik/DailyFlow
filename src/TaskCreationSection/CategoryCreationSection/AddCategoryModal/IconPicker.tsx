/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/require-default-props */

import { memo, useMemo } from 'react'
import { IconContext } from 'react-icons'
import * as ImportedIcons from 'react-icons/io5'
import iconList from '../../../Helpers/iconList'

type IconPickerProps = {
    newCategoryIcon: string
    setNewCategoryIcon: (categoryIcon: string) => void
}
const IconPicker = memo(
    ({ newCategoryIcon, setNewCategoryIcon }: IconPickerProps): JSX.Element => {
        const value = useMemo(
            () => ({
                size: '3em',
                overflow: 'x-scroll',
                display: 'flex',
                color: '#334155',
            }),
            []
        )
        return (
            <IconContext.Provider value={value}>
                <div className="flex-none collapse max-h-60 rounded-3xl">
                    <input type="checkbox" className="peer" />
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

type IconType = keyof typeof ImportedIcons

type IconsProps = {
    setNewCategoryIcon: (iconName: string) => void
}

const Icons = ({ setNewCategoryIcon }: IconsProps): JSX.Element => {
    const memoizedIcons = useMemo(() => {
        return Object.entries(iconList)
    }, [])

    return (
        <>
            {memoizedIcons.map(([name, Icon]) => (
                <button
                    className="transition-all ease-in-out hover:opacity-75 focus:scale-125"
                    type="button"
                    key={name}
                    onClick={() => setNewCategoryIcon(name)}
                >
                    <Icon />
                </button>
            ))}
        </>
    )
}

type SelectedIconProps = {
    iconName: string
}

const SelectedIcon = ({ iconName }: SelectedIconProps): JSX.Element => (
    <button
        className="self-center p-0 m-0 transition ease-in-out collapse-title peer-checked:scale-75 peer-checked:overflow-scroll"
        type="button"
    >
        <DynamicIcon name={iconName} />
    </button>
)

type DynamicIconProps = {
    name: string
}

export const DynamicIcon = ({ name }: DynamicIconProps): JSX.Element => {
    const Icon = ImportedIcons[name as IconType]

    if (!Icon) {
        return <ImportedIcons.IoHappy />
    }
    return <Icon />
}

export default memo(IconPicker)
