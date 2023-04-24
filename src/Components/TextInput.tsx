import onEnterPressed from '../helpers/onEnterPressed'

type CommonInputProps = {
    maxChars: number
    inputRef: React.RefObject<HTMLInputElement>
    isInputCorrect: boolean
    action: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
    darkBackground: boolean
}
const TextInput = ({
    darkBackground,
    maxChars,
    inputRef,
    isInputCorrect,
    action,
    onInput,
}: CommonInputProps) => {
    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        action(e)
    }
    return (
        <input
            onKeyDown={onEnterPressed(handleEnterPress)}
            maxLength={maxChars}
            ref={inputRef}
            onInput={onInput}
            type="text"
            placeholder="Type here..."
            id="taskInput"
            className={`input rounded-3xl mb-5 mr-5 w-full max-w-xs input-bordered ${
                isInputCorrect ? 'input-success' : 'input-error'
            } ${darkBackground ? 'bg-base-300' : ''}`}
        />
    )
}

export default TextInput
