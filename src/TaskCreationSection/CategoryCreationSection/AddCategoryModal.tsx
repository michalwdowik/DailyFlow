/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { ColorResult } from 'react-color'
import IconPicker from './IconPicker'
import ColorPicker from './ColorPicker'
import {
    colorPickerColorHandler,
    colorStyleBgHandler,
} from '../../Helpers/colorStyleClassHandler'
import Button from '../../Components/Button'
import Alert, { AlertType, showAlert } from '../../Components/Alert'
import {
    useCategoryContext,
    CategoryType,
} from '../../Contexts/CategoryContext'
import Portal from '../../Components/Portal'
import useCloseOnEscapeKey from '../../Helpers/useCloseOnEscapeKey'
import useModalLogic from '../../Helpers/useModalLogic'

export interface DefaultCategory extends Omit<CategoryType, 'uuid'> {
    color: string
}

export default function AddCategoryModal() {
    const { categories, addCategory } = useCategoryContext()
    const { showModal, openModal, closeModal } = useModalLogic()
    useCloseOnEscapeKey({ id: 'addCategoryModal', closeModal })

    const [isCorrectTyped, setIsCorrectTyped] = useState(true)
    const [alert, setAlert] = useState<AlertType>({
        title: '',
        type: '',
        background: '',
        isShowed: false,
    })
    const [searchIconInput, setSearchIconInput] = useState('')
    const defaultCategoryParams: DefaultCategory = {
        name: '',
        colorStyle: 'info',
        color: '#38bdf8',
        icon: 'IoIosHappy',
        isAddedByUser: true,
    }
    const [newCategory, setNewCategory] = useState(defaultCategoryParams)
    const inputRef = useRef<HTMLInputElement>(null)
    const maxCategoriesReached = categories.length >= 12

    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        setIsCorrectTyped(e.target.value !== '')
    }

    const createNewCategory = () => {
        if (maxCategoriesReached) {
            showAlert(
                {
                    title: 'You can create up to 7 different categories',
                    type: 'error',
                    background: 'bg-error',
                    isShowed: true,
                },
                setAlert
            )
            return
        }
        const isCategoryValid =
            inputRef.current?.value &&
            !categories.some(({ name }) => inputRef.current?.value === name)

        if (!isCategoryValid) {
            setIsCorrectTyped(false)
            showAlert(
                {
                    title: "You can't create a category with this name, try again!",
                    type: 'error',
                    background: 'bg-error',
                    isShowed: true,
                },
                setAlert
            )
            return
        }

        addCategory({
            ...newCategory,
            name: inputRef.current.value,
            uuid: uuid(),
        })
        showAlert(
            {
                title: 'New category has been added!',
                type: 'success',
                background: 'bg-success',
                isShowed: true,
            },
            setAlert
        )
        inputRef.current.value = ''
        setSearchIconInput('')
        setNewCategory(defaultCategoryParams)
        closeModal()
    }

    const changeColorHandler = (color: ColorResult) => {
        setNewCategory({
            ...newCategory,
            colorStyle: colorPickerColorHandler(color),
            color: color.hex,
        })
    }

    const changeCategoryIconHandler = (icon: string) => {
        setNewCategory({ ...newCategory, icon })
    }

    return (
        <div>
            <OpenModalButton openModal={openModal} />
            {showModal && (
                <Portal rootId="portal">
                    <div>
                        <input
                            type="checkbox"
                            id="addCategoryModal"
                            className="modal-toggle"
                        />
                        <label
                            htmlFor="addCategoryModal"
                            className="backdrop-blur-md modal"
                            onClick={closeModal}
                        >
                            <label
                                className="flex flex-col content-center justify-center gap-3 p-5 pt-10 mt-5 modal-box rounded-3xl bg-slate-100"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="indicator">
                                    <NewCategoryInput
                                        maxChars={17}
                                        inputRef={inputRef}
                                        onInput={onInput}
                                        isInputCorrect={isCorrectTyped}
                                    />
                                    <CreateNewTaskButton
                                        color={newCategory.colorStyle}
                                        action={createNewCategory}
                                    />
                                </div>
                                <ColorPicker
                                    action={changeColorHandler}
                                    color={newCategory.color}
                                />
                                <IconPicker
                                    setSearchIconInput={setSearchIconInput}
                                    searchIconInput={searchIconInput}
                                    newCategoryIcon={newCategory.icon}
                                    setNewCategoryIcon={(
                                        categoryIcon: string
                                    ) =>
                                        changeCategoryIconHandler(categoryIcon)
                                    }
                                />
                            </label>
                        </label>
                    </div>
                </Portal>
            )}
            <Alert alert={alert} />
        </div>
    )
}

type NewCategoryInputProps = {
    maxChars: number
    onInput: (e: ChangeEvent<HTMLInputElement>) => void
    isInputCorrect: boolean
    inputRef: React.RefObject<HTMLInputElement>
}

function NewCategoryInput({
    maxChars,
    onInput,
    isInputCorrect,
    inputRef,
}: NewCategoryInputProps) {
    const inputBorderColor = () => {
        return isInputCorrect ? 'input focus:input' : 'input-error'
    }
    return (
        <input
            ref={inputRef}
            maxLength={maxChars}
            onInput={onInput}
            type="text"
            placeholder="Type here..."
            id="taskInput"
            className={`input mb-5 mr-5 w-full max-w-xs input-bordered ${inputBorderColor}`}
        />
    )
}

type OpenModalButtonProps = {
    openModal: () => void
}
function OpenModalButton({ openModal }: OpenModalButtonProps) {
    return (
        <label
            onClick={openModal}
            htmlFor="addCategoryModal"
            className="p-1 m-0 font-normal bg-transparent border-0 dark:bg:transparent btn-xs btn text-slate-700 hover:scale-110 hover:bg-transparent"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 96 960 960"
                width="24"
            >
                <path
                    fill="#6366f1"
                    d="M440 856V616H200v-80h240V296h80v240h240v80H520v240h-80Z"
                />
            </svg>
            <span>Add</span>
        </label>
    )
}

type CreateNewTaskButtonProps = {
    color: string
    action: () => void
}

function CreateNewTaskButton({ color, action }: CreateNewTaskButtonProps) {
    return (
        <Button
            action={action}
            className={`text-white ${colorStyleBgHandler(
                color
            )} btn-circle transition-all active:scale-90`}
            title={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            }
        />
    )
}
