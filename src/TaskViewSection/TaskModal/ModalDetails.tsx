import { TaskType } from '../../Contexts/TaskContext'
import { DynamicIcon } from '../../TaskCreationSection/CategoryCreationSection/AddCategoryModal/IconPicker'
import DeadlineDetails from './DeadlineDetails'
import Stars from './Stars'

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

export default ModalDetails
