import { v4 as uuid } from 'uuid'
import CategoryTab from './CategoryTab'
import { useTaskContext } from '../../Contexts/TaskContext'

export default function AddedCategoriesTab() {
    const { categoryTabs } = useTaskContext()
    return (
        <div>
            <ul className="flex flex-wrap justify-center max-w-sm gap-0 p-0 menu rounded-box menu-horizontal sm:max-w-lg md:max-w-lg">
                {categoryTabs.map((_, index) => (
                    <CategoryTab
                        key={uuid()}
                        categoryTabs={categoryTabs[index]}
                        categoryTabsLength={categoryTabs.length}
                    />
                ))}
            </ul>
        </div>
    )
}
