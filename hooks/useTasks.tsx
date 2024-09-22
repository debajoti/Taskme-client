// hooks/useTasks.ts
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/AuthProvider';
import { Task } from '@/types/Task';

const useTasks = () => {
  const { tokenValue } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    if (!tokenValue) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('https://taskup-server.onrender.com/api/tasks', {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data: Partial<Task>) => {
    if (!tokenValue) return;

    try {
      const response = await axios.post('https://taskup-server.onrender.com/api/tasks', data, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      setTasks(prevTasks => [...prevTasks, response.data]);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const editTask = async (id: string, data: Partial<Task>) => {
    if (!tokenValue) return;

    try {
      const response = await axios.put(`https://taskup-server.onrender.com/api/tasks/${id}`, data, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      setTasks(prevTasks =>
        prevTasks.map(task => (task._id === id ? response.data : task))
      );
    } catch (err) {
      console.error('Error editing task:', err);
    }
  };

  const deleteTask = async (id: string) => {
    if (!tokenValue) return;

    try {
      await axios.delete(`https://taskup-server.onrender.com/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tokenValue]);

  return { tasks, loading, error, createTask, editTask, deleteTask };
};

export default useTasks;
