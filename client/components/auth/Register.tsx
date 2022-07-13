import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { InputField } from '../InputField';

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
        <InputField id='username' label='Username' type='text' />
        <InputField id='email' label='Email' type='email' />
        <InputField id='password' label='Password' type='password' />
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
