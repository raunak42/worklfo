import React from "react";
import { Task } from "@/lib/db";
import { TaskCard } from "../TaskCard/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface TaskColumnProps {
  id: string;
  tasks: Task[];
}

export const TaskColumn: React.FC<TaskColumnProps> = React.memo(({ id, tasks }) => {
  const { setNodeRef } = useDroppable({ id: id });

  return (
    <div
      ref={setNodeRef}
      className="w-full h-full flex flex-col items-center justify-start space-y-[16px] p-2"
    >
      <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </SortableContext>
      {tasks.length === 0 && (
        <div className="text-gray-400 italic">Drop tasks here</div>
      )}
    </div>
  );
});

TaskColumn.displayName = 'TaskColumn';