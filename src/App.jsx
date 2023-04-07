import React from 'react'
import TaskCreationSection from './TaskCreationSection/TaskCreationSection'
import TaskViewSection from './TaskViewSection/TaskViewSection'
import BackgroundBlobs from './Components/BackgroundBlobs'
import { ThemeContextProvider } from './Contexts/ThemeContext'
import { TaskContextProvider } from './Contexts/TaskContext'

export default function App() {
    return (
        <div className="container min-w-full min-h-screen">
            <TaskContextProvider>
                <div className="grid gap-10 p-10 sm:grid-cols-1 lg:grid-cols-2">
                    <ThemeContextProvider>
                        <BackgroundBlobs />
                        <TaskCreationSection />
                    </ThemeContextProvider>
                    <TaskViewSection />
                </div>
            </TaskContextProvider>
        </div>
    )
}
