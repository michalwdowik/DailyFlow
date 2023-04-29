/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { colorStyleBlobHandler } from '../../Helpers/colorStyleClassHandler'
import { TaskType } from '../../types/types'
import Portal from '../../Components/Portal'
import useCloseOnEscapeKey from '../../hooks/useCloseOnEscapeKey'
import useModalLogic from '../../hooks/useModalLogic'
import ModalBackground from './ModalBackground'
import ModalDetails from './ModalDetails'
import useCloseOnOutsideClick from '../../hooks/useCloseOnOutsideClick'

const TaskModal = ({ task }: TaskModalProps) => {
    const { showModal, openModal, closeModal } = useModalLogic()

    useCloseOnEscapeKey({ id: task.uuid, closeModal })
    useCloseOnOutsideClick({ closeModal })

    return (
        <div>
            <ShowModalButton id={task.uuid} openModal={openModal} />
            <Modal task={task} showModal={showModal} />
        </div>
    )
}
export default TaskModal

const ShowModalButton = ({ id, openModal }: ShowModalButtonProps) => (
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

const Modal = ({ task, showModal }: ModalProps) => (
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
                    >
                        <label
                            htmlFor=""
                            className="p-0 m-0 border-0 modalStyle modal-box rounded-3xl bg-slate-100"
                        >
                            <ModalDetails task={task} />
                            <ModalBackground
                                backgroundColor={colorStyleBlobHandler(
                                    task.colorStyle
                                )}
                            />
                        </label>
                    </label>
                </div>
            </Portal>
        )}
    </div>
)

type TaskModalProps = {
    task: TaskType
}

type ShowModalButtonProps = {
    id: string
    openModal: () => void
}

type ModalProps = { task: TaskType; showModal: boolean }
