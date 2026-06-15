import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import AuthProvider from './context/AuthContext.jsx'
import ProjectProvider from './context/ProjectContext.jsx'
import TaskProvider from './context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProjectProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ProjectProvider>
  </AuthProvider>
)
