import Button from '../../../Components/Button'
import { colorStyleBgHandler } from '../../../Helpers/colorStyleClassHandler'

type CreateNewTaskButtonProps = {
    color: string
    action: () => void
}

const CreateNewTaskButton = ({ color, action }: CreateNewTaskButtonProps) => (
    <Button
        action={action}
        className={`text-white ${colorStyleBgHandler(
            color
        )} btn-circle transition-all active:scale-90`}
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
export default CreateNewTaskButton
