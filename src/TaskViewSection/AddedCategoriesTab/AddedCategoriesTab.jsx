import React, { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { MainContext } from '../../Contexts/Contexts'
import CategoryTab from './CategoryTab'

export default function AddedCategoriesTab() {
    const { addedCategoriesTab } = useContext(MainContext)
    return (
        <div>
            <ul className="flex flex-wrap justify-center max-w-sm gap-0 p-0 menu rounded-box menu-horizontal sm:max-w-lg md:max-w-lg">
                {addedCategoriesTab.map((_, index) => (
                    <CategoryTab
                        key={uuid()}
                        addedCategoryTab={addedCategoriesTab[index]}
                        addedCategoriesTabLength={addedCategoriesTab.length}
                    />
                ))}
            </ul>
        </div>
    )
}
