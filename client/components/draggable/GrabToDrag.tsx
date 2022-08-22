import React, { ReactNode } from 'react';
import { Draggable } from '@hello-pangea/dnd';

type GrabToDragProps = {
  id: string;
  children: ReactNode;
  idx: number;
  isOwner: boolean;
};

const GrabToDrag = ({ id, children, idx, isOwner }: GrabToDragProps) => {
  return (
    <Draggable draggableId={id} index={idx}>
      {(provided, snapshot) => (
        <div
          className='relative'
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          {/* {isOwner && ( */}
          <div
            {...provided.dragHandleProps}
            className='w-4 h-10 absolute top-1/4 -left-2 bg-yellow-500 rounded'
          />
          {/* )} */}
          <div className={snapshot.isDragging ? 'bg-green-50' : 'bg-white'}>
            {children}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default GrabToDrag;
