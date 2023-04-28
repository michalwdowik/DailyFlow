import { TaskType } from '../../types/types'
import { DynamicIcon } from '../../TaskCreationSection/CategoryCreationSection/AddCategoryModal/IconPicker'
import DeadlineDetails from './DeadlineDetails'
import Stars from './Stars'

const ModalDetails = ({ task }: { task: TaskType }) => {
    const taskHasDeadline = task.deadline !== 'Not specified'

    return (
        <div className="p-6 ">
            <div className="flex flex-col content-start gap-2">
                <TaskName taskName={task.name} />
                <TaskCategory taskCategory={task.category} />
                <p className="p-0 m-3 text-8xl text-slate-700">
                    <DynamicIcon iconName={task.icon} />
                </p>
                <Stars taskRate={task.rate} colorStyle={task.colorStyle} />

                {taskHasDeadline && (
                    <DeadlineDetails taskDeadline={task.deadline} />
                )}
            </div>
        </div>
    )
}

const TaskName = ({ taskName }: TaskNameProps) => (
    <h1 className="m-0 font-bold text-center break-all text-slate-700">
        {taskName}
    </h1>
)

const TaskCategory = ({ taskCategory }: TaskCategoryProps) => (
    <h2 className="self-center p-0 m-0 font-extralight">{taskCategory}</h2>
)

export default ModalDetails

type TaskNameProps = {
    taskName: string
}

type TaskCategoryProps = {
    taskCategory: string
}
