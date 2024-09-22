"use client";
import React, { useState } from "react";
import useTasks from "@/hooks/useTasks"; 
import TaskForm from "@/components/tasks/TaskForm"; 
import Modal from "@/components/Modals"; // Ensure this path is correct
import { Task } from "@/types/Task";
import { EditIcon, Trash2 } from "lucide-react";

const KanbanBoard: React.FC = () => {
  const { tasks, loading, error, createTask, editTask, deleteTask } = useTasks();
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedOverStatus, setDraggedOverStatus] = useState<string | null>(null);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (status: string) => {
    setDraggedOverStatus(status);
  };

  const handleDrop = async (status: "To Do" | "In Progress" | "Completed") => {
    if (draggedTask) {
      try {
        await editTask(draggedTask._id, { status });
      } catch (error) {
        console.error("Failed to update task status", error);
      } finally {
        setDraggedTask(null);
        setDraggedOverStatus(null);
      }
    }
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.status] = acc[task.status] || [];
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const handleCreateTask = async (newTask: Partial<Task>) => {
    await createTask(newTask);
    setShowTaskForm(false);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setTaskToEdit(undefined);
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center p-4 font-jetbrains">
      <button
        className="mb-8 bg-black text-white py-2 px-4 rounded"
        onClick={() => setShowTaskForm(true)}
      >
        Create Task
      </button>

      <Modal isOpen={showTaskForm} onClose={handleCloseForm}>
        <TaskForm
          task={taskToEdit}
          onSubmit={taskToEdit ? (data) => editTask(taskToEdit._id, data) : handleCreateTask}
          onCancel={handleCloseForm}
        />
      </Modal>

      <div className="w-full flex justify-center flex-wrap space-x-4">
        {["To Do", "In Progress", "Completed"].map((status) => (
          <div
            key={status}
            className={`w-full sm:w-1/4 p-4 border rounded-lg ${draggedOverStatus === status ? "bg-teal-100" : "bg-white"} mb-4`}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver(status);
            }}
            onDrop={() => handleDrop(status as "To Do" | "In Progress" | "Completed")}
          >
            <h2 className="font-bold text-2xl font-montserrat">{status}</h2>
            {groupedTasks[status]?.map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={() => handleDragStart(task)}
                className="p-2 border rounded mt-2 cursor-pointer hover:bg-teal-100 relative"
              >
                <h3 className="font-semibold mt-4">{task.title}</h3>
                {task.description && <p className="text-sm">{task.description}</p>}
                {task.dueDate && (
                  <p className="text-sm font-semibold text-teal-800">
                    {new Date(task.dueDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                )}
                <div className="absolute top-1 right-1">
                  <button onClick={() => handleEditTask(task)} className="text-blue-500">
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDeleteTask(task._id)} className="text-red-500 ml-2">
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
