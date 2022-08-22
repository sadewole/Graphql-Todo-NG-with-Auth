import React, { ReactNode } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const DraggableContainer = ({ children }: { children: ReactNode }) => {
  const onDragEnd = (result: DropResult) => {
    console.log('onDragEnd');
  };
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
    </div>
  );
};

export default DraggableContainer;
