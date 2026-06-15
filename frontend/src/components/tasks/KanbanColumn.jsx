import React from "react";

import {
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";

import { FaTasks } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";

function KanbanColumn({
  title,
  tasks,
}) {
  const getColumnIcon =
    () => {
      switch (title) {
        case "Todo":
          return <FaTasks />;

        case "In Progress":
          return (
            <AiOutlineLoading3Quarters />
          );

        case "Waiting":
          return (
            <MdOutlinePendingActions />
          );

        case "Done":
          return (
            <BsCheckCircleFill />
          );

        default:
          return null;
      }
    };

  return (
    <Droppable
      droppableId={title}
    >
      {(provided) => (
        <div
          className="kanban-column"
          ref={
            provided.innerRef
          }
          {...provided.droppableProps}
        >
          <h2>
            {getColumnIcon()}
            {title}
          </h2>

          {tasks.length ===
            0 && (
            <p>
              No Tasks
            </p>
          )}

          {tasks.map(
            (
              task,
              index
            ) => (
              <Draggable
                key={
                  task.id
                }
                draggableId={String(
                  task.id
                )}
                index={index}
              >
                {(
                  provided
                ) => (
                  <TaskCard
                    task={
                      task
                    }
                    provided={
                      provided
                    }
                  />
                )}
              </Draggable>
            )
          )}

          {
            provided.placeholder
          }
        </div>
      )}
    </Droppable>
  );
}

export default KanbanColumn;