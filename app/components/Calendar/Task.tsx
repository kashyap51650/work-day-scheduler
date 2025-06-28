"use client";
import { Task } from "@prisma/client";
import clsx from "clsx";
import { getCurrentMinutes } from "@/utils/time";
import { isToday } from "@/utils/date";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { TaskActionButton } from "./TaskActionButton";
import { useModal } from "@/hooks/useModal";
import { DeleteConfirmModal } from "../DeleteConfirmModal";
import { deleteTask } from "@/actions/task";
import { EditTaskModal } from "../EditTaskModal";

interface TaskCardProps {
  task: Task;
  topOffset: number;
  height: number;
  width?: number;
  left?: number;
  onClick?: (task: Task) => void;
}

export const TaskCard = ({
  task,
  topOffset,
  height,
  width = 100,
  left = 0,
  onClick,
}: TaskCardProps) => {
  const { openModal, closeModal, isOpen } = useModal();
  const {
    openModal: openEditModal,
    closeModal: closeEditModal,
    isOpen: isEditOpen,
  } = useModal();

  const currentMinutes = getCurrentMinutes();
  const startTotalMinutes =
    parseInt(task.startTime.split(":")[0]) * 60 +
    parseInt(task.startTime.split(":")[1]);
  const upcoming = isToday(task.date) && startTotalMinutes > currentMinutes;

  const confirmDelete = async () => {
    await deleteTask(task.id);
    closeModal();
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(task);
        }}
        style={{
          top: `${topOffset}%`,
          height: `${height}%`,
          width: `${width}%`,
          left: `${left}%`,
        }}
        className="absolute pointer-events-auto cursor-pointer group p-0.5"
      >
        <div
          className={clsx(
            "w-full h-full p-[6px] text-[11px] rounded-md shadow-sm relative",
            "bg-indigo-200 border-l-4 ",
            upcoming
              ? "font-semibold bg-indigo-300 border-indigo-700"
              : "text-black-100 border-indigo-500 opacity-80 "
          )}
        >
          {/* Hover icons */}
          <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <TaskActionButton
              onClick={openEditModal}
              icon={<PencilSquareIcon className="w-4 h-4 text-indigo-700" />}
              className="hover:bg-indigo-100"
              aria-label="Edit task"
            />
            <TaskActionButton
              onClick={openModal}
              icon={<TrashIcon className="w-4 h-4 text-red-600" />}
              className="hover:bg-red-100"
              aria-label="Delete task"
            />
          </div>
          <strong className="block text-[12px] truncate">{task.title}</strong>
          <span className="text-[10px] block">
            {task.startTime} – {task.endTime}
          </span>
        </div>
      </div>
      <DeleteConfirmModal
        open={isOpen}
        onCancel={closeModal}
        onConfirm={confirmDelete}
      />
      <EditTaskModal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        initialData={task}
      />
    </>
  );
};
