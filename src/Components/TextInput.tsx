import onEnterPressed from '../helpers/onEnterPressed'

const TextInput = ({
    darkBackground,
    maxChars,
    inputRef,
    isInputCorrect,
    createNewCategory,
    handleInputChange,
}: TextInputProps) => {
    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        createNewCategory(e)
    }
    return (
        <input
            onKeyDown={onEnterPressed(handleEnterPress)}
            maxLength={maxChars}
            ref={inputRef}
            onInput={handleInputChange}
            type="text"
            placeholder="Type here..."
            id="taskInput"
            className={`input rounded-3xl mb-5 mr-5 w-full max-w-xs input-bordered ${
                isInputCorrect ? 'input-success' : 'input-error'
            } ${darkBackground && 'bg-base-300'}`}
        />
    )
}

export default TextInput

type TextInputProps = {
    maxChars: number
    inputRef: React.RefObject<HTMLInputElement>
    isInputCorrect: boolean
    createNewCategory: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    darkBackground: boolean
}
