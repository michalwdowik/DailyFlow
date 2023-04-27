import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { colorStyleTextHandler } from '../helpers/colorStyleClassHandler'
import { StarType } from '../types/types'

const TaskImportance = ({
    taskRate,
    changeTaskRate,
    categoryColor,
}: TaskImportanceProps) => {
    const [hoveredStars, setHoveredStars] = useState<number>(2)
    const hoverStars = (stars: number) => {
        setHoveredStars(stars)
    }
    return (
        <div className="flex items-baseline gap-3 ">
            <span className="label-text text-slate-700">How Important?:</span>
            <div className="star-rating">
                {[...Array(3)].map((_, index) => {
                    return (
                        <Star
                            key={uuid()}
                            index={index + 1}
                            changeTaskRate={changeTaskRate}
                            hoverStars={hoverStars}
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
    changeTaskRate,
    hoverStars,
    taskRate,
    hoveredStars,
    categoryColor,
}: StarType) => {
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
            onClick={() => changeTaskRate(index)}
            onMouseEnter={() => hoverStars(index)}
            onMouseLeave={() => hoverStars(taskRate)}
        >
            <span className="star ">&#9733;</span>
        </button>
    )
}

type TaskImportanceProps = Pick<
    StarType,
    'taskRate' | 'changeTaskRate' | 'categoryColor'
>
