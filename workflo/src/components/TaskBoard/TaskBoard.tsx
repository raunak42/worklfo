"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Task, UserDoc } from "@/lib/db";
import { TaskColumn } from "../TaskColumn/TaskColumn";
import { TaskCard } from "../TaskCard/TaskCard";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

interface TaskBoardProps {
  user: UserDoc;
}

type TaskStatus = "To do" | "In progress" | "Under review" | "Finished";

const statusMap: Record<TaskStatus, TaskStatus> = {
  "To do": "To do",
  "In progress": "In progress",
  "Under review": "Under review",
  Finished: "Finished",
};

export const TaskBoard: React.FC<TaskBoardProps> = React.memo(({ user }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    if (user.tasks) {
      setTasks(user.tasks);
    }
  }, [user.tasks]);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const task = tasks.find((t) => t._id === active.id);
      setActiveTask(task || null);
    },
    [tasks]
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeTask = tasks.find((task) => task._id === active.id);
      const overId = over.id.toString();

      if (!activeTask) return;

      setTasks((currentTasks) => {
        const activeIndex = currentTasks.findIndex(
          (task) => task._id === active.id
        );

        if (overId in statusMap) {
          // Dropping on a column
          const newStatus = overId as TaskStatus;
          return currentTasks.map((task, index) =>
            index === activeIndex ? { ...task, status: newStatus } : task
          );
        } else {
          // Dropping on another task
          const overTask = currentTasks.find((task) => task._id === overId);
          if (!overTask) return currentTasks;

          if (activeTask.status !== overTask.status) {
            // Cross-column dragging
            return currentTasks.map((task) =>
              task._id === activeTask._id
                ? { ...task, status: overTask.status }
                : task
            );
          } else {
            // Same-column dragging
            const overIndex = currentTasks.findIndex(
              (task) => task._id === overId
            );
            return arrayMove(currentTasks, activeIndex, overIndex);
          }
        }
      });
    },
    [tasks]
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTasks((currentTasks) => {
        const activeTask = currentTasks.find((task) => task._id === active.id);
        if (!activeTask) return currentTasks;

        const newStatus =
          over.id in statusMap ? (over.id as TaskStatus) : activeTask.status;
        const updatedTask = { ...activeTask, status: newStatus };

        return currentTasks.map((task) =>
          task._id === active.id ? updatedTask : task
        );
      });
    }

    setActiveTask(null);
  }, []);

  const getTasksByStatus = useMemo(() => {
    return (status: TaskStatus) =>
      tasks.filter((task) => task.status === status);
  }, [tasks]);

  if (tasks.length === 0) {
    return <div>No tasks</div>;
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="w-full h-full min-h-[400px] border rounded-[8px] flex flex-col items-center">
        <div className="flex flex-row items-center justify-between w-full p-[12px]">
          {Object.values(statusMap).map((status) => (
            <h1
              key={status}
              className="text-center w-full font-[400] text-[20px] text-[#555555]"
            >
              {status}
            </h1>
          ))}
        </div>
        <div className="w-full h-full flex flex-row items-start justify-center">
          {Object.entries(statusMap).map(([key, value]) => (
            <TaskColumn key={key} id={key} tasks={getTasksByStatus(value)} />
          ))}
        </div>
      </div>
      <DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>
    </DndContext>
  );
});

TaskBoard.displayName = "TaskBoard";
