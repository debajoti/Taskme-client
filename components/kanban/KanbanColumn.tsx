import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import KanbanCard from './KanbanCard';
import { Task } from '@/types/Task';

const KanbanColumn = ({ column, tasks }: any) => {
    return (
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="bg-gray-200 p-4 rounded-lg shadow-md"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2 className="font-bold text-xl mb-4">{column.title}</h2>
            <div className="space-y-4">
              {tasks.map((task: Task, index : any) => (
                <KanbanCard key={task._id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    );
  };

export default KanbanColumn
