import { AlertVariantType } from '../types/AlertTypes'

const AlertVariant: AlertVariantType = {
    ERROR_UP_TO_7_CATEGORIES: {
        title: 'You can create up to 7 different categories',
        type: 'error',
        background: 'bg-error',
        isShowed: true,
    },
    ERROR_WRONG_NAME: {
        title: "You can't create a category with this name, try again!",
        type: 'error',
        background: 'bg-error',
        isShowed: true,
    },
    ERROR_NO_DONE_TASKS: {
        title: 'There are no completed tasks to be deleted',
        type: 'error',
        background: 'bg-error',
        isShowed: true,
    },
    SUCCESS_DONE_TASKS_REMOVED: {
        title: 'All done tasks has been removed successfully',
        type: 'success',
        background: 'bg-success',
        isShowed: true,
    },
    SUCCESS_NEW_CATEGORY_ADDED: {
        title: 'New category has been added!',
        type: 'success',
        background: 'bg-success',
        isShowed: true,
    },
    ERROR_MAX_CATEGORIES_REACHED: {
        title: 'You can add tasks of 8 different categories at a time',
        type: 'error',
        background: 'bg-error',
        isShowed: true,
    },
}

export default AlertVariant
