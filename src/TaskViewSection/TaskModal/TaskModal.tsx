/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { colorStyleBlobHandler } from '../../Helpers/colorStyleClassHandler'
import { TaskType } from '../../Contexts/TaskContext'
import Portal from '../../Components/Portal'
import useCloseOnEscapeKey from '../../Helpers/useCloseOnEscapeKey'
import useModalLogic from '../../Helpers/useModalLogic'
import ModalBackground from './ModalBackground'
import ModalDetails from './ModalDetails'

const TaskModal = ({ task }: { task: TaskType }) => {
    const { showModal, openModal, closeModal } = useModalLogic()
    useCloseOnEscapeKey({ id: task.uuid, closeModal })

    return (
        <div>
            <ShowModalButton id={task.uuid} openModal={openModal} />
            <Modal task={task} showModal={showModal} closeModal={closeModal} />
        </div>
    )
}
export default TaskModal

const ShowModalButton = ({
    id,
    openModal,
}: {
    id: string
    openModal: () => void
}) => (
    <label
        onClick={openModal}
        htmlFor={id}
        className="p-0 ml-5 bg-transparent border-0 btn-xs btn bg-slate-700 dark:bg-slate-700 "
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 0 24 24"
            width="18px"
            fill="#FFFFFF"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
    </label>
)

const Modal = ({
    task,
    showModal,
    closeModal,
}: {
    task: TaskType
    showModal: boolean
    closeModal: () => void
}) => (
    <div>
        {showModal && (
            <Portal rootId="portal">
                <div>
                    <input
                        type="checkbox"
                        id={task.uuid}
                        className="modal-toggle"
                    />
                    <label
                        htmlFor={task.uuid}
                        className="backdrop-blur-md modal"
                        onClick={closeModal}
                    >
                        <label
                            onClick={(e) => e.stopPropagation()}
                            htmlFor=""
                            className="p-0 m-0 modalStyle modal-box rounded-3xl bg-slate-100"
                        >
                            <ModalDetails task={task} />
                            <ModalBackground
                                color={colorStyleBlobHandler(task.colorStyle)}
                            />
                        </label>
                    </label>
                </div>
            </Portal>
        )}
    </div>
)
