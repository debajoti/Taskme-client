import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Task } from '@/types/Task';

interface KanbanCardProps {
  task: Task;
  index: number;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task, index }) => {
    return (
        <Draggable draggableId={task._id} index={index}>
          {(provided) => (
            <Card
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="bg-white shadow p-4 rounded-md"
            >
              <CardHeader>
                <h3 className="font-bold">{task.title}</h3>
              </CardHeader>
              <CardContent>
                <p>{task.description}</p>
              </CardContent>
            </Card>
          )}
        </Draggable>
      );
}

export default KanbanCard
