import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteModal from "../components/common/DeleteModal";
import Layout from "../components/common/Layout";

import { TaskContext } from "../context/TaskContext";
import { ProjectContext } from "../context/ProjectContext";

import {
  FaSearch,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function TasksPage() {
  const navigate = useNavigate();

  const { tasks, deleteTask } = useContext(TaskContext);

  const { projects } = useContext(ProjectContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("");

  const [projectFilter, setProjectFilter] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  let filteredTasks = tasks.filter((task) => {
    const project = projects.find((p) => p.id === task.projectId);

    const projectName = project?.name || "";

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projectName.toLowerCase().includes(searchTerm.toLocaleLowerCase());

    const matchesProject =
      projectFilter === "" || String(task.projectId) === projectFilter;

    const matchesPriority =
      priorityFilter === "" || task.priority === priorityFilter;

    const matchesStatus = statusFilter === "" || task.state === statusFilter;

    return matchesSearch && matchesProject && matchesPriority && matchesStatus;
  });

  if (sortBy === "az") {
    filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortBy === "za") {
    filteredTasks.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (sortBy === "date") {
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }


  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedTask) return;

    deleteTask(selectedTask.id);

    setShowDeleteModal(false);
    setSelectedTask(null);
  };

  return (
    <Layout pageTitle="Task Center">
      <div className="tasks-filters-card">
        <h3>Filters & Search</h3>

        <div className="tasks-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search Project or Task"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="date">Due Date</option>
          </select>

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="">All Projects</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priorities</option>

            <option value="High">High</option>

            <option value="Medium">Medium</option>

            <option value="Low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>

            <option value="Todo">Todo</option>

            <option value="In Progress">In Progress</option>

            <option value="Waiting">Waiting</option>

            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className="tasks-table-card">
        <h3>Project Tasks</h3>

        <div className="table-container">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Project Type</th>
                <th>Project Status</th>

                <th>Task</th>
                <th>Task Type</th>

                <th>Priority</th>
                <th>Status</th>

                <th>Due Date</th>
                <th>Due Time</th>

                <th>Notes</th>
                <th>Files</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((task) => {
                const project = projects.find((p) => p.id === task.projectId);

                return (
                  <tr key={task.id}>
                    <td>{project?.name}</td>
                    <td>{project?.type}</td>
                    <td>{project?.status}</td>

                    <td>{task.title}</td>
                    <td>{task.type}</td>
                    <td>{task.priority}</td>
                    <td>{task.state}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.dueTime}</td>

                    <td>{task.notes?.length || 0}</td>
                    <td>{task.attachments?.length || 0}</td>

                    <td className="last-btn">
                      <button
                        className="icon-btn edit-btn"
                        onClick={() => navigate(`/tasks/edit/${task.id}`)}
                        title="Task Details"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="icon-btn delete-btn"
                        onClick={() => handleDeleteClick(task)}
                        title="Delete Task"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        title="Delte Task"
        message={selectedTask ? `Are you sure you want to delete "${selectedTask.title}"? This action cannot be undone.` : ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedTask(null)
        }}/>
    </Layout>
  );
}

export default TasksPage;
