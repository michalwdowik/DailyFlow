import {
    ColorStyleState,
    colorStyleBgHandler,
} from '../../../helpers/colorStyleClassHandler'

const CreateCategoryButton = ({
    buttonColor,
    createNewCategory,
}: CreateCategoryButtonProps) => (
    <div>
        <button
            type="button"
            onClick={createNewCategory}
            className={`text-white ${colorStyleBgHandler(
                buttonColor
            )} btn-circle transition-all active:scale-90`}
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
    </div>
)
export default CreateCategoryButton

type CreateCategoryButtonProps = {
    buttonColor: ColorStyleState
    createNewCategory: () => void
}
