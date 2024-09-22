import React, { useState } from 'react';
import { Task } from '@/types/Task';
import { Button } from '@/components/ui/button';
import TaskForm from './TaskForm';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Edit, Trash2 } from 'lucide-react';

interface TaskTableProps {
  tasks: Task[];
  onEditTask: (id: string, data: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onCreateTask: (data: Partial<Task>) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEditTask, onDeleteTask, onCreateTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleCreate = () => {
    setEditTask(null);
    setShowModal(true);
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const handleSubmit = (data: Partial<Task>) => {
    if (editTask) {
      onEditTask(editTask._id, data);
    } else {
      onCreateTask(data);
    }
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-extrabold font-jetbrains">Task List</h2>
        <Button onClick={handleCreate}>Create New Task</Button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b">
                <td className="px-4 py-2">{task.title}</td>
                
                <td className="px-4 py-2">{task.status == 'To Do' ? (<Button variant={'destructive'}>{task.status}</Button>) : task.status == 'In Progress' ? (<Button className='bg-yellow-600 text-white'>{task.status}</Button>) : (<Button variant={'secondary'} className='bg-green-600 text-white'>{task.status}</Button>)}</td>
                <td className="px-4 py-2">{task.priority == 'High' ? (<Button variant={'destructive'}>{task.priority}</Button>) : task.priority == 'Medium' ? (<Button className='bg-yellow-600 text-white'>{task.priority}</Button>) : (<Button variant={'secondary'} className='bg-green-600 text-white'>{task.priority}</Button>)}</td>
                <td className="px-4 py-2">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button variant="secondary" onClick={() => handleEdit(task)}><Edit /></Button>
                    <Button variant="destructive" onClick={() => onDeleteTask(task._id)}><Trash2 /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            {editTask ? 'Edit Task' : 'Create Task'}
          </DialogHeader>
          <TaskForm task={editTask ?? undefined} onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskTable;
