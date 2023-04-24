import { TaskType } from '../../Contexts/TaskContext'
import calculateDaysLeft from '../../Helpers/calculateDaysLeft'

const DeadlineDetails = ({
    date,
    task,
}: {
    task: TaskType
    date: string
}): JSX.Element => {
    const daysLeft = calculateDaysLeft(task.deadline)
    const pastDeadline = daysLeft <= -1
    const todayIsTheDeadline = daysLeft === 0
    const deadlineInFuture = daysLeft > 0

    return (
        <div className="bg-transparent stats">
            <div className="stat">
                {pastDeadline && (
                    <PastDeadline daysLeft={daysLeft} date={date} />
                )}
                {todayIsTheDeadline && <TodaysDeadline date={date} />}
                {deadlineInFuture && (
                    <FutureDeadline date={date} daysLeft={daysLeft} />
                )}
            </div>
        </div>
    )
}
export default DeadlineDetails

const PastDeadline = ({
    daysLeft,
    date,
}: {
    daysLeft: number
    date: string
}) => (
    <>
        <div className="stat-title text-slate-700">{`${Math.abs(
            daysLeft
        )} days after the`}</div>
        <div className="stat-value text-error">Deadline</div>
        <div className="stat-desc">{`Deadline: ${date}`}</div>
    </>
)

const TodaysDeadline = ({ date }: { date: string }) => (
    <>
        <div className="stat-title text-slate-700">Due to:</div>
        <div className="stat-value text-slate-500">Today</div>
        <div className="stat-desc">{`Deadline: ${date}`}</div>
    </>
)

const FutureDeadline = ({
    daysLeft,
    date,
}: {
    daysLeft: number
    date: string
}) => (
    <>
        <div className="stat-title">Days left:</div>
        <div className="stat-value text-slate-500">{daysLeft}</div>
        <div className="stat-desc">{`Deadline: ${date}`}</div>
    </>
)
