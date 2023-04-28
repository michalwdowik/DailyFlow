import { KeyboardEvent, MouseEvent } from 'react'

const AddTaskButton = ({
    submitHandler,
    isCorrectTyped,
}: AddTaskButtonProps) => {
    const buzzIfTaskNotValid = !isCorrectTyped && 'buzz-effect'

    return (
        <button
            id="addTaskButton"
            aria-label="Add Task Button"
            type="button"
            onClick={submitHandler}
            className={`btn-m btn-circle btn ${buzzIfTaskNotValid}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                />
            </svg>
        </button>
    )
}
export default AddTaskButton

type AddTaskButtonProps = {
    submitHandler: (
        e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
    ) => void
    isCorrectTyped: boolean
}
