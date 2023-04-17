import TaskCreationSection from './TaskCreationSection/TaskCreationSection'
import TaskViewSection from './TaskViewSection/TaskViewSection'
import BackgroundBlobs from './Components/BackgroundBlobs'
import { ThemeContextProvider } from './Contexts/ThemeContext'
import { TaskContextProvider } from './Contexts/TaskContext'

const App = () => (
    <div className="container min-w-full min-h-screen">
        <TaskContextProvider>
            <div className="flex flex-col gap-10 p-5 sm:px-28 lg:flex-row lg:p-10">
                <ThemeContextProvider>
                    <BackgroundBlobs />
                    <TaskCreationSection />
                </ThemeContextProvider>
                <TaskViewSection />
            </div>
        </TaskContextProvider>
    </div>
)
export default App
