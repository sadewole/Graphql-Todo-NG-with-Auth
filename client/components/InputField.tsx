import React from 'react';
import { Field, ErrorMessage } from 'formik';

export const InputField = ({
  type,
  id,
  label,
}: {
  type: string;
  id: string;
  label: string;
}) => {
  return (
    <div className='mb-4'>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900'
      >
        {label}
      </label>
      <Field
        id={id}
        type={type}
        name={id}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
      />
      <ErrorMessage name={id} component='small' className='text-red-500' />
    </div>
  );
};
