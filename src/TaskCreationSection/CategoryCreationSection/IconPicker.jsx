/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { memo } from 'react'
import { IconContext } from 'react-icons'
import * as ImportedIcons from 'react-icons/io5'

function IconPicker({
    newCategoryIcon,
    setNewCategoryIcon,
    searchIconInput,
    setSearchIconInput,
}) {
    const onInput = (e) => {
        setSearchIconInput(e.target.value)
    }

    return (
        <div>
            <div>
                <IconContext.Provider
                    value={{
                        size: '3em',
                        overflow: 'x-scroll',
                        display: 'flex',
                        color: '#334155',
                    }}
                >
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

const Icons = ({ setNewCategoryIcon, searchIconInput }) => {
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
            return { ...acc, [name]: Icon }
        }, {})

    const iconsToRender = Object.entries(reducedIcons).map(([name, Icon]) => ({
        name,
        Icon,
    }))

    return iconsToRender.map(({ name, Icon }) => (
        <button
            className="transition ease-in-out focus:scale-125"
            type="button"
            key={name}
            onClick={() => setNewCategoryIcon(Icon.name)}
        >
            <Icon />
        </button>
    ))
}

function SearchIconInput({ searchIconInput, action, color }) {
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

function SelectedIcon({ iconName }) {
    return (
        <button
            className="self-center p-0 m-0 transition ease-in-out collapse-title peer-checked:scale-75 peer-checked:overflow-scroll"
            type="button"
        >
            <DynamicIcon name={iconName} />
        </button>
    )
}

export function DynamicIcon({ name }) {
    const Icon = ImportedIcons[name]

    if (!Icon) {
        return <ImportedIcons.IoHappy />
    }
    return <Icon />
}

export default memo(IconPicker)
