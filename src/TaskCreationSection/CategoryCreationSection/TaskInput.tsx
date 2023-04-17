import { MutableRefObject } from 'react'

type TaskInputProps = {
    maxInputLength: number
    inputRef: InputRefType
    isCorrectTyped: boolean
    submitHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
type InputRefType = MutableRefObject<HTMLInputElement | null>

const TaskInput = ({
    submitHandler,
    maxInputLength,
    inputRef,
    isCorrectTyped,
}: TaskInputProps) => (
    <input
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                submitHandler(e)
            }
        }}
        maxLength={maxInputLength}
        ref={inputRef}
        type="text"
        placeholder="Type here..."
        id="taskInput"
        className={`input ${
            isCorrectTyped
                ? 'input-success focus:input-success'
                : 'input-error focus:input-error'
        } w-full rounded-3xl bg-base-300  
      `}
    />
)

export default TaskInput
