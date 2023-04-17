const options = {
    title: 'Select Deadline',
    autoHide: false,
    todayBtn: true,
    clearBtn: true,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('2000-01-01'),
    theme: {
        background:
            ' bg-gray-300 dark:bg-base-300 rounded-3xl m-0 overflow-auto',
        todayBtn:
            'transition active:scale-90 active:dark:scale-90  bg-success dark:bg-success  hover:bg-success hover:dark:bg-success',
        clearBtn:
            'transition active:scale-90 active:dark:scale-90 focus:dark:outline-0 focus:outline-0',
        icons: 'active:scale-125 transition duration-100 dark:bg-transparent',
        text: ' hover:bg-transparent hover:dark:bg-transparent hover:text-slate-300 transition',
        disabledText: 'blur pointer-events-none ',
        input: 'rounded-3xl dark:bg-base-300',
        inputIcon: '',
        selected:
            'hover:bg-transparent hover:dark:bg-transparent bg-transparent scale-150 duration-100 text-success dark:text-success transition ease-in-out',
    },
    icons: {
        prev: () => (
            <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 96 960 960"
                    width="24"
                >
                    <path
                        fill="#FFFFFF"
                        d="M480 896 160 576l320-320 57 56-224 224h487v80H313l224 224-57 56Z"
                    />
                </svg>
            </span>
        ),
        next: () => (
            <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 96 960 960"
                    width="24"
                >
                    <path
                        fill="#FFFFFF"
                        d="m480 896-57-56 224-224H160v-80h487L423 312l57-56 320 320-320 320Z"
                    />
                </svg>
            </span>
        ),
    },
    datepickerClassNames:
        'fixed inset-0 flex items-center justify-center w-72 h-96',
    defaultDate: new Date(),
    language: 'en',
}

export default options
