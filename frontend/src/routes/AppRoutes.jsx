import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";

import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

import ProjectsPage from "../pages/ProjectsPage";
import CreateProjectPage from "../pages/CreateProjectPage";
import EditProjectPage from "../pages/EditProjectPage";

import KanbanPage from "../pages/KanbanPage";

import TasksPage from "../pages/TasksPage";
import CreateTaskPage from "../pages/CreateTaskPage";
import EditTaskPage from "../pages/EditTaskPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect Root */}
        <Route
          path="/"
          element={
            <Navigate
              to="/projects"
              replace
            />
          }
        />

        {/* Public Routes */}
        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Projects */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/create"
          element={
            <ProtectedRoute>
              <CreateProjectPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/edit/:projectId"
          element={
            <ProtectedRoute>
              <EditProjectPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute>
              <KanbanPage />
            </ProtectedRoute>
          }
        />

        {/* Tasks */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/create"
          element={
            <ProtectedRoute>
              <CreateTaskPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/edit/:taskId"
          element={
            <ProtectedRoute>
              <EditTaskPage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Navigate
              to="/projects"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;