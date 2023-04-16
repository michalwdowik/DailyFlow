import ToolbarButtons from './ToolbarButtons'

type ToolbarType = {
    searchInput: string
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const ToolBar = ({ searchInput, onInput }: ToolbarType) => (
    <div className="relative flex gap-5 border-error">
        <TaskSearchBar searchInput={searchInput} onInput={onInput} />
        <ToolbarButtons />
    </div>
)
export default ToolBar

const TaskSearchBarIcon = () => (
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
        <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
            />
        </svg>
    </div>
)

const TaskSearchBarInput = ({ searchInput, onInput }: ToolbarType) => (
    <input
        value={searchInput}
        onInput={onInput}
        type="text"
        id="simple-search"
        className={`   input block w-full rounded-3xl border-0 bg-base-300 pl-10 text-xs placeholder-transparent dark:text-white sm:text-sm sm:placeholder-gray-400`}
        placeholder="Search task"
    />
)
const TaskSearchBar = ({ searchInput, onInput }: ToolbarType) => (
    <>
        <TaskSearchBarIcon />
        <TaskSearchBarInput searchInput={searchInput} onInput={onInput} />
    </>
)
