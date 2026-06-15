import React, {
  useState,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import DeleteModal from "../common/DeleteModal";

import { TaskContext } from "../../context/TaskContext";

import { FaTrash } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";

function TaskCard({
  task,
  provided,
}) {
  const navigate =
    useNavigate();

  const { removeTask } =
    useContext(TaskContext);

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const handleDeleteClick = (
    e
  ) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete =
    async () => {
      try {
        await removeTask(
          task.id
        );

        setShowDeleteModal(
          false
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to delete task"
        );
      }
    };

  return (
    <>
      <div
        className="task-card"
        ref={provided?.innerRef}
        {...(provided?.draggableProps ||
          {})}
        {...(provided?.dragHandleProps ||
          {})}
      >
        <h4>{task.title}</h4>

        <p>
          {task.description}
        </p>

        <p>
          <strong>Type:</strong>{" "}
          {task.type}
        </p>

        <p>
          <strong>
            Priority:
          </strong>{" "}
          {task.priority}
        </p>

        <p>
          <strong>
            Due Date:
          </strong>{" "}
          {new Date(
            task.dueDate
          ).toLocaleDateString()}
        </p>

        <p>
          <strong>
            Due Time:
          </strong>{" "}
          {task.dueTime}
        </p>

        <p>
          <strong>
            State:
          </strong>{" "}
          {task.state}
        </p>

        <p>
          <strong>
            Notes:
          </strong>{" "}
          {task.notes?.length ||
            0}
        </p>

        <p>
          <strong>
            Files:
          </strong>{" "}
          {task
            .attachments
            ?.length || 0}
        </p>

        <div className="task-actions">
          <button
            className="icon-btn details-btn"
            title="Task Details"
            onClick={() =>
              navigate(
                `/tasks/edit/${task.id}`
              )
            }
          >
            <IoOpenOutline />
          </button>

          <button
            className="icon-btn delete-btn"
            title="Delete Task"
            onClick={
              handleDeleteClick
            }
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={
          showDeleteModal
        }
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"?`}
        onConfirm={
          handleConfirmDelete
        }
        onCancel={() =>
          setShowDeleteModal(
            false
          )
        }
      />
    </>
  );
}

export default TaskCard;