import React, {
  useState,
  useContext,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Layout from "../components/common/Layout";
import TaskForm from "../components/tasks/TaskForm";

import { TaskContext } from "../context/TaskContext";

import { FaSave } from "react-icons/fa";

function CreateTaskPage() {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const projectId =
    searchParams.get("projectId");

  const { addTask } =
    useContext(TaskContext);

  const [formData,
    setFormData] =
    useState({
      title: "",
      description: "",
      type: "",
      priority: "",
      dueDate: "",
      dueTime: "",
      state: "Todo",
    });

  const isFormValid =
    formData.title.trim() &&
    formData.description.trim() &&
    formData.type.trim() &&
    formData.priority &&
    formData.dueDate &&
    formData.dueTime &&
    formData.state;

  const handleSaveTask =
    async () => {
      if (!isFormValid)
        return;

      try {
        await addTask({
          ...formData,
          projectId:
            Number(projectId),
        });

        navigate(
          `/projects/${projectId}`
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to create task"
        );
      }
    };

  return (
    <Layout
      pageTitle="New Task"
      actionButton={
        <button
          disabled={!isFormValid}
          onClick={
            handleSaveTask
          }
        >
          <FaSave />
          Save Task
        </button>
      }
    >
      <TaskForm
        formData={formData}
        setFormData={setFormData}
      />

      <div className="form-actions">
        <button
          type="button"
          className="cancel-btn"
          onClick={() =>
            navigate(
              `/projects/${projectId}`
            )
          }
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={!isFormValid}
          onClick={
            handleSaveTask
          }
        >
          <FaSave />
          Save Task
        </button>
      </div>
    </Layout>
  );
}

export default CreateTaskPage;