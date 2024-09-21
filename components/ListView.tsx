import React, { useContext, useEffect, useState } from 'react'
import TaskTable from './tasks/Tasktable'
import axios from 'axios';
import { AuthContext } from '@/context/AuthProvider';
import { Task } from '@/types/Task';

const fetchTasks = async (token : any) => {
    try {
      const response = await axios.get('https://taskup-server.onrender.com/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };

const ListView = () => {
    const { tokenValue } = useContext(AuthContext);
    const [tasks, setTasks] = useState<Task[]>([]);
  
    useEffect(() => {
      const getTasks = async () => {
        if (tokenValue) {
          try {
    const fetchedTasks = await fetchTasks(tokenValue);
            setTasks(fetchedTasks);
          } catch (error) {
            console.error('Failed to fetch tasks', error);
          }
        }
      };
  
      getTasks();
    }, [tokenValue]);


    const handleCreateTask = async (data: Partial<Task>) => {
        try {
          const response = await axios.post('https://taskup-server.onrender.com/api/tasks', data,  {
            headers: {
              Authorization: `Bearer ${tokenValue}`, 
            },
          });
          setTasks([...tasks, response.data]);
        } catch (error) {
          console.error('Error creating task:', error);
        }
      };
    
      const handleEditTask = async (id: string, data: Partial<Task>) => {
        try {
          const response = await axios.put(`https://taskup-server.onrender.com/api/tasks/${id}`, data, {
            headers: {
              Authorization: `Bearer ${tokenValue}`, 
            },
          });
          setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
        } catch (error) {
          console.error('Error editing task:', error);
        }
      };
    
      const handleDeleteTask = async (id: string) => {
        try {
          await axios.delete(`https://taskup-server.onrender.com/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${tokenValue}`, 
            },
          });
          setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      };

  return (
    <div className='w-10/12 mx-auto mt-8'>
      <TaskTable 
        tasks={tasks} 
        onEditTask={handleEditTask} 
        onDeleteTask={handleDeleteTask} 
        onCreateTask={handleCreateTask} 
      />
    </div>
  )
}

export default ListView
