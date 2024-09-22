import React from 'react';
import TaskTable from './tasks/Tasktable';
import useTasks from '@/hooks/useTasks';

const ListView = () => {
  const { tasks, loading, error, createTask, editTask, deleteTask } = useTasks();

  if (loading) return <div className='text-center'>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='w-10/12 mx-auto mt-8'>
      <TaskTable 
        tasks={tasks} 
        onEditTask={editTask} 
        onDeleteTask={deleteTask} 
        onCreateTask={createTask} 
      />
    </div>
  );
};

export default ListView;
