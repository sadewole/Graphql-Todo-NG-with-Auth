import React, { ReactNode } from 'react';
import { Draggable } from 'react-beautiful-dnd';

type GrabToDragProps = {
  id: string;
  children: ReactNode;
  idx: number;
  isOwner: boolean;
};

const GrabToDrag = ({ id, children, idx, isOwner }: GrabToDragProps) => {
  return (
    <Draggable draggableId={id} index={idx}>
      {(provided) => (
        <div
          className='relative'
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {isOwner && (
            <div
              className='w-4 h-10 absolute top-1/4 -left-2 bg-yellow-500'
              {...provided.dragHandleProps}
            />
          )}
          <div>{children}</div>
        </div>
      )}
    </Draggable>
  );
};

export default GrabToDrag;
