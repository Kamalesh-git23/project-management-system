import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Layout from "../components/common/Layout";

import ProjectForm from "../components/projects/ProjectForm";

import {
  ProjectContext,
} from "../context/ProjectContext";

import { FaSave } from "react-icons/fa";

function EditProjectPage() {
  const { projectId } =
    useParams();

  const navigate =
    useNavigate();

  const {
    projects,
    editProject,
  } = useContext(
    ProjectContext
  );

  const project =
    projects.find(
      (project) =>
        project.id ===
        Number(projectId)
    );

  const [formData,
    setFormData] =
    useState({
      name: "",
      description: "",
      type: "",
      startDate: "",
      endDate: "",
      priority: "",
      teamMembers: "",
      status: "",
    });

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,

        startDate:
          project.startDate?.split(
            "T"
          )[0],

        endDate:
          project.endDate?.split(
            "T"
          )[0],
      });
    }
  }, [project]);

  if (!project) {
    return (
      <Layout pageTitle="Project Settings">
        <h2>
          Project Not Found
        </h2>
      </Layout>
    );
  }

  const isFormValid =
    formData.name.trim() &&
    formData.description.trim() &&
    formData.type.trim() &&
    formData.startDate &&
    formData.endDate &&
    formData.priority &&
    formData.teamMembers.trim() &&
    formData.status;

  const handleSaveChanges =
    async () => {
      if (!isFormValid)
        return;

      try {
        await editProject(
          project.id,
          formData
        );

        navigate(
          "/projects"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to update project"
        );
      }
    };

  return (
    <Layout
      pageTitle="Project Settings"
      actionButton={
        <button
          disabled={!isFormValid}
          onClick={
            handleSaveChanges
          }
        >
          <FaSave />
          Save Changes
        </button>
      }
    >
      <ProjectForm
        formData={formData}
        setFormData={setFormData}
      />

      <div className="form-actions">
        <button
          type="button"
          className="cancel-btn"
          onClick={() =>
            navigate(
              "/projects"
            )
          }
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={!isFormValid}
          onClick={
            handleSaveChanges
          }
        >
          <FaSave />
          Save Changes
        </button>
      </div>
    </Layout>
  );
}

export default EditProjectPage;