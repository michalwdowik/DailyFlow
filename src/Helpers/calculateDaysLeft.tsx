const calculateDaysLeft = (taskDeadline: string) => {
    const deadlineDate = new Date(taskDeadline)
    const todayDate = new Date()
    const difference = deadlineDate.getTime() - todayDate.getTime()
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
    return totalDays
}

export default calculateDaysLeft
