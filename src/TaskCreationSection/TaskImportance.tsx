/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import { Dispatch, SetStateAction, useState } from 'react'
import { colorStyleTextHandler } from '../Helpers/colorStyleClassHandler'

type TaskImportanceProps = {
    taskRate: number
    setTaskRate: (rate: number) => void
    categoryColor: string
}
const TaskImportance = ({
    taskRate,
    setTaskRate,
    categoryColor,
}: TaskImportanceProps) => {
    const [hoveredStars, setHoveredStars] = useState<number>(2)

    return (
        <div className="flex items-baseline gap-3 ">
            <span className="label-text text-slate-700">How Important?:</span>
            <div className="star-rating">
                {[...Array(3)].map((_, index) => {
                    return (
                        <Star
                            key={index}
                            index={index + 1}
                            setTaskRate={setTaskRate}
                            setHoveredStars={setHoveredStars}
                            taskRate={taskRate}
                            categoryColor={categoryColor}
                            hoveredStars={hoveredStars}
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default TaskImportance

type StarProps = {
    index: number
    setTaskRate: (rate: number) => void
    setHoveredStars: Dispatch<SetStateAction<number>>
    taskRate: number
    hoveredStars: number
    categoryColor: string
}
const Star = ({
    index,
    setTaskRate,
    setHoveredStars,
    taskRate,
    hoveredStars,
    categoryColor,
}: StarProps) => {
    const colorStar =
        index <= (hoveredStars || taskRate) &&
        `${colorStyleTextHandler(categoryColor)}`

    return (
        <button
            type="button"
            key={index}
            className={` p-1
      transition
      ease-in-out hover:scale-125
      ${colorStar}`}
            onClick={() => setTaskRate(index)}
            onMouseEnter={() => setHoveredStars(index)}
            onMouseLeave={() => setHoveredStars(taskRate)}
        >
            <span className="star ">&#9733;</span>
        </button>
    )
}
