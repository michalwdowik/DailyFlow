import Button from '../../Components/Button'

type AddTaskButtonProps = {
    submitHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void
    isCorrectTyped: boolean
}

const AddTaskButton = ({
    submitHandler,
    isCorrectTyped,
}: AddTaskButtonProps) => {
    const buzzIfTaskNotValid = () => {
        return !isCorrectTyped && 'buzz-effect'
    }
    return (
        <Button
            className={`btn-m btn-circle btn ${buzzIfTaskNotValid()}`}
            action={submitHandler}
            title={
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
            }
        />
    )
}
export default AddTaskButton
