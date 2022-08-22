import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const Column = (props: Props) => {
  return (
    <div className='mb-8'>
      <h3 className='py-4 text-lg font-semibold'>{props.title}</h3>
      <div>{props.children}</div>
    </div>
  );
};

export default Column;
