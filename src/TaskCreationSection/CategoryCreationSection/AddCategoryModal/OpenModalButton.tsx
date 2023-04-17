/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

type OpenModalButtonProps = {
    openModal: () => void
}
const OpenModalButton = ({ openModal }: OpenModalButtonProps) => (
    <label
        onClick={openModal}
        htmlFor="addCategoryModal"
        className="p-1 m-0 font-normal bg-transparent border-0 dark:bg:transparent btn-xs btn text-slate-700 hover:scale-110 hover:bg-transparent"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 96 960 960"
            width="24"
        >
            <path
                fill="#6366f1"
                d="M440 856V616H200v-80h240V296h80v240h240v80H520v240h-80Z"
            />
        </svg>
        <span>Add</span>
    </label>
)

export default OpenModalButton
