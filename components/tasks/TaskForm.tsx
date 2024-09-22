import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Task } from '@/types/Task';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: Partial<Task>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Completed'>(task?.status || 'To Do');
  const [priority, setPriority] = useState(task?.priority || 'Medium');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{task ? 'Edit Task' : 'Create Task'}</h2>
      <div className="space-y-4">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select className="w-full p-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value as 'To Do' | 'In Progress' | 'Completed')}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select className="w-full p-2 border rounded" value={priority} onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <Input type="date" value={dueDate ? new Date(dueDate).toISOString().split('T')[0] : ''} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>{task ? 'Update' : 'Create'}</Button>
      </div>
    </div>
  );
};

export default TaskForm;
