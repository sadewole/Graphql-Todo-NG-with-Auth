import React, { ReactNode } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Todo, useUpdateTodoMutation } from 'generated/graphql';
import { Item } from 'interface';

const DraggableContainer = ({
  allTodo,
  children,
}: {
  children: ReactNode;
  allTodo?: Item<Todo>[];
}) => {
  const [_update, updateTodo] = useUpdateTodoMutation();

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    const findItem = allTodo?.find(
      (todo) => todo.id === draggableId
    ) as Item<Todo>;

    await updateTodo({
      id: findItem.id,
      title: findItem.title,
      completed: destination.droppableId !== 'column-1',
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='text-sm p-2 bg-gray-200 rounded flex'>
        You can also change the status of your todo by holding down{' '}
        <div className='w-2.5 h-4 bg-yellow-500 mx-1'></div> to drag
      </div>
      {children}
    </DragDropContext>
  );
};

export default DraggableContainer;
