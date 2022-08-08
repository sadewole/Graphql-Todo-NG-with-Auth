import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { InputField } from '../InputField';
import { useRegisterMutation } from '../../generated/graphql';

const Register = () => {
  const [_, register] = useRegisterMutation();
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', submit: null }}
      validationSchema={yup.object().shape({
        username: yup.string().required('Field is required!'),
        password: yup
          .string()
          .min(3, 'Password length must be greater than 3')
          .required('Field is required!'),
        email: yup
          .string()
          .email('Invalid email')
          .required('Field is required!'),
      })}
      onSubmit={async ({ submit, ...values }, { setErrors }) => {
        const response = await register(values);

        if (response.error) {
          setErrors({
            submit: response.error.graphQLErrors[0].message,
          });
        } else {
          console.log('registered successfully');
        }
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <InputField id='username' label='Username' type='text' />
          <InputField id='email' label='Email' type='email' />
          <InputField id='password' label='Password' type='password' />
          {errors.submit && (
            <div
              className='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
              role='alert'
            >
              <svg
                aria-hidden='true'
                className='flex-shrink-0 inline w-5 h-5 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clipRule='evenodd'
                ></path>
              </svg>
              {errors.submit}
            </div>
          )}
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
};

export default Register;
