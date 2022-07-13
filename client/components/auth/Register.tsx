import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const Register = () => (
  <Formik
    initialValues={{ username: '', email: '', password: '' }}
    validationSchema={yup.object().shape({
      username: yup.string().required('Field is required!'),
      password: yup
        .string()
        .min(3, 'Password length must be greater than 3')
        .required('Field is required!'),
      email: yup.string().email('Invalid email').required('Field is required!'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <div className='mb-4'>
          <label
            htmlFor='username'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Username
          </label>
          <Field
            id='username'
            type='text'
            name='username'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          />
          <ErrorMessage
            name='username'
            component='small'
            className='text-red-500'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Email
          </label>
          <Field
            id='email'
            type='email'
            name='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          />
          <ErrorMessage
            name='email'
            component='small'
            className='text-red-500'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Password
          </label>
          <Field
            id='password'
            type='password'
            name='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          />
          <ErrorMessage
            name='password'
            component='small'
            className='text-red-500'
          />
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          disabled={isSubmitting}
        >
          Submit
        </button>
      </Form>
    )}
  </Formik>
);

export default Register;
