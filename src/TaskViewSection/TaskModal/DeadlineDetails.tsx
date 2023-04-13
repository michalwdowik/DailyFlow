import { TaskType } from '../../Contexts/TaskContext'

export default function DeadlineDetails({
    date,
    task,
}: {
    task: TaskType
    date: string
}): JSX.Element {
    const calculateDaysLeft = () => {
        const deadlineDate = new Date(`${task.deadline}`)
        const todayDate = new Date()
        const difference = deadlineDate.getTime() - todayDate.getTime()
        const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
        return totalDays
    }

    const daysLeft = calculateDaysLeft()
    const pastDeadline = daysLeft <= -1
    const todayIsTheDeadline = daysLeft === 0
    const deadlineInFuture = daysLeft > 0

    return (
        <div className="bg-transparent stats ">
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

function PastDeadline({ daysLeft, date }: { daysLeft: number; date: string }) {
    return (
        <>
            <div className="stat-title text-slate-700">{`${Math.abs(
                daysLeft
            )} days after the`}</div>
            <div className="stat-value text-error">Deadline</div>
            <div className="stat-desc">{`Deadline: ${date}`}</div>
        </>
    )
}

function TodaysDeadline({ date }: { date: string }) {
    return (
        <>
            <div className="stat-title text-slate-700">Due to:</div>
            <div className="stat-value text-slate-500">Today</div>
            <div className="stat-desc">{`Deadline: ${date}`}</div>
        </>
    )
}

function FutureDeadline({
    daysLeft,
    date,
}: {
    daysLeft: number
    date: string
}) {
    return (
        <>
            <div className="stat-title">Days left:</div>
            <div className="stat-value text-slate-500">{daysLeft}</div>
            <div className="stat-desc">{`Deadline: ${date}`}</div>
        </>
    )
}
