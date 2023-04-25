import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { colorStyleTextHandler } from '../helpers/colorStyleClassHandler'
import { StarProps, TaskImportanceProps } from '../types/TaskTypes'

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
                            key={uuid()}
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
