/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { v4 as uuid } from 'uuid'
import { DynamicIcon } from '../../TaskCreationSection/CategoryCreationSection/IconPicker'
import {
    colorStyleTextHandler,
    colorStyleBlobHandler,
} from '../../Helpers/colorStyleClassHandler'
import { TaskType } from '../../Contexts/TaskContext'
import DeadlineDetails from './DeadlineDetails'
import Portal from '../../Components/Portal'
import useCloseOnEscapeKey from '../../Helpers/useCloseOnEscapeKey'
import useModalLogic from '../../Helpers/useModalLogic'

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

const ModalDetails = ({ task }: { task: TaskType }) => {
    const taskHasDeadline = task.deadline !== 'Not specified'

    return (
        <div className="p-6 ">
            <div className="flex flex-col content-start gap-2">
                <TaskName task={task} />
                <TaskCategory task={task} />
                <p className="p-0 m-3 text-8xl text-slate-700">
                    <DynamicIcon name={task.icon} />
                </p>
                <Stars task={task} />

                {taskHasDeadline && (
                    <DeadlineDetails date={task.deadline} task={task} />
                )}
            </div>
        </div>
    )
}

const TaskName = ({ task }: { task: TaskType }) => (
    <h1 className="m-0 font-bold text-center break-all text-slate-700">
        {task.name}
    </h1>
)

const TaskCategory = ({ task }: { task: TaskType }) => (
    <h2 className="self-center p-0 m-0 font-extralight">{task.category}</h2>
)

const Stars = ({ task }: { task: TaskType }) => (
    <div className="inline-flex">
        {[...Array(task.rate)].map(() => (
            <span key={uuid()}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`h-4 w-4 ${colorStyleTextHandler(
                        task.colorStyle
                    )}`}
                >
                    <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
        ))}
    </div>
)

const ModalBackground = ({ color }: { color: string }) => (
    <svg
        className="bottom-0 left-0 right-0 w-full "
        id="wave"
        viewBox="0 0 1440 230"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop stopColor="rgba(0, 0, 0, 1)" offset="0%" />
                <stop stopColor="rgba(0, 0, 0, 1)" offset="100%" />
            </linearGradient>
        </defs>
        <path
            fill={color}
            d="M0,161L26.7,145.7C53.3,130,107,100,160,72.8C213.3,46,267,23,320,15.3C373.3,8,427,15,480,46C533.3,77,587,130,640,130.3C693.3,130,747,77,800,46C853.3,15,907,8,960,23C1013.3,38,1067,77,1120,80.5C1173.3,84,1227,54,1280,53.7C1333.3,54,1387,84,1440,111.2C1493.3,138,1547,161,1600,164.8C1653.3,169,1707,153,1760,149.5C1813.3,146,1867,153,1920,149.5C1973.3,146,2027,130,2080,134.2C2133.3,138,2187,161,2240,172.5C2293.3,184,2347,184,2400,180.2C2453.3,176,2507,169,2560,153.3C2613.3,138,2667,115,2720,95.8C2773.3,77,2827,61,2880,80.5C2933.3,100,2987,153,3040,172.5C3093.3,192,3147,176,3200,161C3253.3,146,3307,130,3360,126.5C3413.3,123,3467,130,3520,122.7C3573.3,115,3627,92,3680,76.7C3733.3,61,3787,54,3813,49.8L3840,46L3840,230L3813.3,230C3786.7,230,3733,230,3680,230C3626.7,230,3573,230,3520,230C3466.7,230,3413,230,3360,230C3306.7,230,3253,230,3200,230C3146.7,230,3093,230,3040,230C2986.7,230,2933,230,2880,230C2826.7,230,2773,230,2720,230C2666.7,230,2613,230,2560,230C2506.7,230,2453,230,2400,230C2346.7,230,2293,230,2240,230C2186.7,230,2133,230,2080,230C2026.7,230,1973,230,1920,230C1866.7,230,1813,230,1760,230C1706.7,230,1653,230,1600,230C1546.7,230,1493,230,1440,230C1386.7,230,1333,230,1280,230C1226.7,230,1173,230,1120,230C1066.7,230,1013,230,960,230C906.7,230,853,230,800,230C746.7,230,693,230,640,230C586.7,230,533,230,480,230C426.7,230,373,230,320,230C266.7,230,213,230,160,230C106.7,230,53,230,27,230L0,230Z"
        />
    </svg>
)
