import React from "react";
import { Task } from "@/lib/db";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDistanceToNow, parseISO } from "date-fns";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = React.memo(({ task }) => {
  const deadlineDate = new Date(task.deadline);
  const formattedDeadline = deadlineDate.toISOString().split("T")[0];

  const creationDate = parseISO(
    new Date(task.createdAt).toISOString().split("T")[0]
  );
  const relativeTime = formatDistanceToNow(creationDate, { addSuffix: true });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        gap-[8px] h-full w-[250px] border border-gray-300 rounded-md flex flex-col items-start p-4 justify-start bg-[#F9F9F9]
        hover:cursor-grab active:cursor-grabbing transition-shadow duration-200
        ${isDragging ? "shadow-lg cursor-grabbing" : "hover:shadow-md"}
      `}
    >
      <h2 className="text-[#606060] font-[500] text-[16px]">{task.title}</h2>
      <p className="text-[#797979] font-[400] text-[12px]">
        {task.description}
      </p>
      <div
        className={`px-[6px] py-[4px] text-xs text-[#FFFFFF] rounded-[8px] ${
          task.priority === "Urgent" && "bg-[#FF6B6B]"
        } ${task.priority === "Medium" && "bg-[#FFA235]"} ${
          task.priority === "Low" && "bg-[#0ECC5A]"
        }`}
      >
        {task.priority}
      </div>

      <div className="flex flex-row items-center gap-[6px]">
        <Image alt="clock icon" width={18} height={18} src={"/clock.svg"} />
        <h1 className="font-[600] text-[14px] text-[#606060]">
          {formattedDeadline}
        </h1>
      </div>
      <h1 className="font-[600] text-[14px] text-[#797979]">{relativeTime}</h1>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';