import React from 'react';
import { Droppable } from '@hello-pangea/dnd';

type Props = {
  title: string;
  id: string;
  children: React.ReactNode;
};

const Column = (props: Props) => {
  return (
    <div className='mb-8'>
      <h3 className='py-4 text-lg font-semibold'>{props.title}</h3>
      <Droppable droppableId={props.id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {props.children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
