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
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

export default DraggableContainer;
