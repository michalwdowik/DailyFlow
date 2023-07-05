import CategoryTab from './CategoryTab'

import { useTaskContext } from '../../Contexts/TaskContext'

const CategoriesMenu = (): JSX.Element => {
    const { categoryTabs } = useTaskContext()
    return (
        <div>
            <ul className="flex flex-wrap justify-center max-w-sm gap-0 p-0 menu rounded-box menu-horizontal sm:max-w-lg md:max-w-lg">
                {categoryTabs.map((category, index) => (
                    <CategoryTab
                        key={category.name}
                        categoryTab={categoryTabs[index]}
                        categoryTabsLength={categoryTabs.length}
                    />
                ))}
            </ul>
        </div>
    )
}
export default CategoriesMenu
