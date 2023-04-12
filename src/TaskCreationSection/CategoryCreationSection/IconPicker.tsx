/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { ChangeEvent, memo, useMemo } from 'react'
import { IconContext } from 'react-icons'
import * as ImportedIcons from 'react-icons/io5'

type IconPickerProps = {
    newCategoryIcon: string
    setNewCategoryIcon: (categoryIcon: string) => void
    searchIconInput: string
    setSearchIconInput: (e: string) => void
}
function IconPicker({
    newCategoryIcon,
    setNewCategoryIcon,
    searchIconInput,
    setSearchIconInput,
}: IconPickerProps): JSX.Element {
    const onInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchIconInput(e.target.value)
    }

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
        <div>
            <div>
                <IconContext.Provider value={value}>
                    <div className="flex-none collapse max-h-60 rounded-3xl">
                        <input type="checkbox" className="peer" />
                        <SelectedIcon iconName={newCategoryIcon} />
                        <div className="relative p-0 m-0 overflow-auto collapse-content place-items-center accent-slate-700">
                            <SearchIconInput
                                searchIconInput={searchIconInput}
                                action={onInput}
                            />
                            <div className="flex flex-wrap justify-center ">
                                <Icons
                                    searchIconInput={searchIconInput}
                                    setNewCategoryIcon={setNewCategoryIcon}
                                />
                            </div>
                        </div>
                    </div>
                </IconContext.Provider>
            </div>
        </div>
    )
}

type IconType = keyof typeof ImportedIcons

type IconsProps = {
    setNewCategoryIcon: (iconName: string) => void
    searchIconInput: string
}

function Icons({
    setNewCategoryIcon,
    searchIconInput,
}: IconsProps): JSX.Element {
    const maxIcons = 250
    const excludedKeywords = [
        'outline',
        'sharp',
        'arrow',
        'circle',
        'chevron',
        'caret',
    ]

    const reducedIcons = Object.entries(ImportedIcons)
        .slice(0, maxIcons)
        .filter(([name]) => {
            const lowerCaseName = name.toLowerCase()
            return (
                lowerCaseName.includes(searchIconInput.toLowerCase()) &&
                !excludedKeywords.some((keyword) =>
                    lowerCaseName.includes(keyword)
                )
            )
        })
        .reduce((acc, [name, Icon]) => {
            return { ...acc, [name as IconType]: Icon }
        }, {})

    const iconsToRender = Object.entries(reducedIcons).map(([name, Icon]) => ({
        name,
        Icon,
    }))

    return (
        <div>
            {iconsToRender.map(({ name, Icon }) => (
                <button
                    className="transition ease-in-out focus:scale-125"
                    type="button"
                    key={name}
                    onClick={() =>
                        setNewCategoryIcon((Icon as { name: string }).name)
                    }
                >
                    <DynamicIcon name={name} />
                </button>
            ))}
        </div>
    )
}

type SearchIconInputProps = {
    searchIconInput: string
    action: (e: ChangeEvent<HTMLInputElement>) => void
    color?: string
}
function SearchIconInput({
    searchIconInput,
    action,
    color,
}: SearchIconInputProps): JSX.Element {
    return (
        <input
            value={searchIconInput}
            onInput={action}
            type="text"
            id="simple-search"
            className={` ${color} input sticky top-3 m-auto mb-3 block w-3/4 rounded-3xl border-0 bg-base-300 pl-10 text-sm`}
            placeholder="Search task"
        />
    )
}
type SelectedIconProps = {
    iconName: string
}

function SelectedIcon({ iconName }: SelectedIconProps): JSX.Element {
    return (
        <button
            className="self-center p-0 m-0 transition ease-in-out collapse-title peer-checked:scale-75 peer-checked:overflow-scroll"
            type="button"
        >
            <DynamicIcon name={iconName} />
        </button>
    )
}

type DynamicIconProps = {
    name: string
}

export function DynamicIcon({ name }: DynamicIconProps): JSX.Element {
    const Icon = ImportedIcons[name as IconType]

    if (!Icon) {
        return <ImportedIcons.IoHappy />
    }
    return <Icon />
}

export default memo(IconPicker)
