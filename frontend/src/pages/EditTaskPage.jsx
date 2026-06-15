import React, {
  useState,
  useContext,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Layout from "../components/common/Layout";
import TaskForm from "../components/tasks/TaskForm";

import { TaskContext } from "../context/TaskContext";

import {
  FaArrowLeft,
  FaSave,
  FaStickyNote,
  FaTrash,
} from "react-icons/fa";

function EditTaskPage() {
  const { taskId } =
    useParams();

  const navigate =
    useNavigate();

  const {
    tasks,
    editTask,
    createNote,
    removeNote,
    uploadTaskAttachment,
    removeAttachment,
  } = useContext(
    TaskContext
  );

  const task =
    tasks.find(
      (task) =>
        task.id ===
        Number(taskId)
    );

  const [note,
    setNote] =
    useState("");

  const [file,
    setFile] =
    useState(null);

  const [editedTask,
    setEditedTask] =
    useState({
      title: "",
      description: "",
      type: "",
      priority: "",
      state: "",
      dueDate: "",
      dueTime: "",
    });

  useEffect(() => {
    if (task) {
      setEditedTask({
        ...task,

        dueDate:
          task.dueDate?.split(
            "T"
          )[0],
      });
    }
  }, [task]);

  if (!task) {
    return (
      <Layout pageTitle="Task Details">
        <div
          style={{
            padding:
              "20px",
          }}
        >
          <h2>
            Task Not Found
          </h2>
        </div>
      </Layout>
    );
  }

  const isFormValid =
    editedTask.title.trim() &&
    editedTask.description.trim() &&
    editedTask.type.trim() &&
    editedTask.priority &&
    editedTask.state &&
    editedTask.dueDate &&
    editedTask.dueTime;

  const handleSaveChanges =
    async () => {
      try {
        await editTask(
          task.id,
          {
            ...editedTask,
            projectId:
              task.projectId,
          }
        );

        navigate(
          `/projects/${task.projectId}`
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to update task"
        );
      }
    };

  const handleAddNote =
    async () => {
      if (!note.trim())
        return;

      try {
        await createNote(
          task.id,
          note
        );

        setNote("");
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to add note"
        );
      }
    };

  const handleUpload =
    async () => {
      if (!file)
        return;

      try {
        await uploadTaskAttachment(
          task.id,
          file
        );

        setFile(null);
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to upload file"
        );
      }
    };

  return (
    <Layout
      pageTitle="Task Details"
      actionButton={
        <button
          disabled={
            !isFormValid
          }
          onClick={
            handleSaveChanges
          }
        >
          <FaSave />
          Save Changes
        </button>
      }
    >
      <div className="task-details">
        <TaskForm
          formData={
            editedTask
          }
          setFormData={
            setEditedTask
          }
        />

        {/* NOTES */}

        <div className="form-section">
          <h3>Notes</h3>

          <div className="note-input">
            <input
              type="text"
              placeholder="Add Note"
              value={note}
              onChange={(e) =>
                setNote(
                  e.target
                    .value
                )
              }
            />

            <button
              type="button"
              onClick={
                handleAddNote
              }
            >
              <FaStickyNote />
              Add Note
            </button>
          </div>

          <ul>
            {task.notes?.map(
              (
                note
              ) => (
                <li
                  key={
                    note.id
                  }
                >
                  {
                    note.content
                  }

                  <button
                    type="button"
                    className="icon-btn delete-btn"
                    onClick={() =>
                      removeNote(
                        task.id,
                        note.id
                      )
                    }
                  >
                    <FaTrash />
                  </button>
                </li>
              )
            )}
          </ul>
        </div>

        {/* FILES */}

        <div className="form-section">
          <h3>
            Attachments
          </h3>

          <input
            type="file"
            onChange={(
              e
            ) =>
              setFile(
                e.target
                  .files[0]
              )
            }
          />

          <button
            type="button"
            onClick={
              handleUpload
            }
          >
            Upload File
          </button>

          {task
            .attachments
            ?.length ===
          0 ? (
            <p>
              No
              attachments
              available.
            </p>
          ) : (
            <ul>
              {task.attachments?.map(
                (
                  attachment
                ) => (
                  <li
                    key={
                      attachment.id
                    }
                  >
                    <a
                      href={
                        attachment.fileUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {
                        attachment.fileName
                      }
                    </a>

                    <button
                      type="button"
                      className="icon-btn delete-btn"
                      onClick={() =>
                        removeAttachment(
                          attachment.id
                        )
                      }
                    >
                      <FaTrash />
                    </button>
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate(
                `/projects/${task.projectId}`
              )
            }
          >
            <FaArrowLeft />
            Back To Board
          </button>

          <button
            type="button"
            disabled={
              !isFormValid
            }
            onClick={
              handleSaveChanges
            }
          >
            <FaSave />
            Save Changes
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default EditTaskPage;