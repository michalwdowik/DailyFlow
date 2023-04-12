/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import { Dispatch, SetStateAction, useState } from 'react'
import { colorStyleTextHandler } from '../colorStyleClassHandler'

type ImportanceProps = {
    rate: number
    setRate: (rate: number) => void
    colorStyle: string
}
export default function Importance({
    rate,
    setRate,
    colorStyle,
}: ImportanceProps) {
    const [hover, setHover] = useState<number>(2)

    return (
        <div className="flex items-baseline gap-3 ">
            <span className="label-text text-slate-700">How Important?:</span>
            <div className="star-rating">
                {[...Array(3)].map((_, index) => {
                    index += 1
                    return (
                        <Star
                            key={index}
                            index={index}
                            setRate={setRate}
                            setHover={setHover}
                            rate={rate}
                            colorStyle={colorStyle}
                            hover={hover}
                        />
                    )
                })}
            </div>
        </div>
    )
}

type StarProps = {
    index: number
    setRate: (rate: number) => void
    setHover: Dispatch<SetStateAction<number>>
    rate: number
    hover: number
    colorStyle: string
}
function Star({
    index,
    setRate,
    setHover,
    rate,
    hover,
    colorStyle,
}: StarProps) {
    const colorStar = (index: number) => {
        return index <= (hover || rate)
            ? `${colorStyleTextHandler(colorStyle)}`
            : ''
    }

    return (
        <button
            type="button"
            key={index}
            className={` p-1
      transition
      ease-in-out
      ${colorStar(index)}`}
            onClick={() => setRate(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rate)}
        >
            <span className="star ">&#9733;</span>
        </button>
    )
}
