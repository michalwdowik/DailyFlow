import calculateDaysLeft from '../../Helpers/calculateDaysLeft'

const DeadlineDetails = ({
    taskDeadline,
}: DeadlineDetailsProps): JSX.Element => {
    const daysToDeadline = calculateDaysLeft(taskDeadline)
    const pastDeadline = daysToDeadline <= -1
    const todayIsTheDeadline = daysToDeadline === 0
    const deadlineInFuture = daysToDeadline > 0

    return (
        <div className="bg-transparent stats">
            <div className="stat">
                {pastDeadline && (
                    <PastDeadline
                        taskDeadline={taskDeadline}
                        daysToDeadline={daysToDeadline}
                    />
                )}
                {todayIsTheDeadline && (
                    <TodaysDeadline taskDeadline={taskDeadline} />
                )}
                {deadlineInFuture && (
                    <FutureDeadline
                        taskDeadline={taskDeadline}
                        daysToDeadline={daysToDeadline}
                    />
                )}
            </div>
        </div>
    )
}
export default DeadlineDetails

const PastDeadline = ({
    daysToDeadline,
    taskDeadline,
}: DeadlineDetailsExtendedProps) => (
    <>
        <div className="stat-title text-slate-700">{`${Math.abs(
            daysToDeadline
        )} days after the`}</div>
        <div className="stat-value text-error">Deadline</div>
        <div className="stat-desc">{`Deadline: ${taskDeadline}`}</div>
    </>
)

const TodaysDeadline = ({ taskDeadline }: DeadlineDetailsProps) => (
    <>
        <div className="stat-title text-slate-700">Due to:</div>
        <div className="stat-value text-slate-500">Today</div>
        <div className="stat-desc">{`Deadline: ${taskDeadline}`}</div>
    </>
)

const FutureDeadline = ({
    daysToDeadline,
    taskDeadline,
}: DeadlineDetailsExtendedProps) => (
    <>
        <div className="stat-title">Days left:</div>
        <div className="stat-value text-slate-500">{daysToDeadline}</div>
        <div className="stat-desc">{`Deadline: ${taskDeadline}`}</div>
    </>
)

type DeadlineDetailsProps = {
    taskDeadline: string
}

type DeadlineDetailsExtendedProps = DeadlineDetailsProps & {
    daysToDeadline: number
}
