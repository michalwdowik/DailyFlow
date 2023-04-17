import { ChangeEvent } from 'react'

type NewCategoryInputProps = {
    maxChars: number
    onInput: (e: ChangeEvent<HTMLInputElement>) => void
    isInputCorrect: boolean
    inputRef: React.RefObject<HTMLInputElement>
    createNewCategory: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const NewCategoryInput = ({
    maxChars,
    onInput,
    isInputCorrect,
    inputRef,
    createNewCategory,
}: NewCategoryInputProps) => (
    <input
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                createNewCategory(e)
            }
        }}
        ref={inputRef}
        maxLength={maxChars}
        onInput={onInput}
        type="text"
        placeholder="Type here..."
        id="taskInput"
        className={`input mb-5 mr-5 w-full max-w-xs input-bordered ${
            isInputCorrect ? 'input-success' : 'input-error'
        }`}
    />
)

export default NewCategoryInput
