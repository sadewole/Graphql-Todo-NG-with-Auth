import { KeyboardEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateTodoMutation } from '../generated/graphql';

const AddTodoField = () => {
  const [todo, setTodo] = useState('');
  const [_, addTodo] = useCreateTodoMutation();

  const onKeyDown = async (e: KeyboardEvent<HTMLElement>) => {
    if (e.code === 'Enter') {
      const response = await addTodo({ title: todo });
      if (!response.error) {
        toast.success('created successfully', {
          position: 'top-right',
          duration: 5000,
        });
        setTodo('');
      } else {
        toast.error(response.error.graphQLErrors[0].message, {
          position: 'top-right',
          duration: 5000,
        });
      }
    }
  };

  return (
    <div className='relative z-0 mt-8 mb-14 w-full group'>
      <input
        type='text'
        name='todo'
        id='todo'
        className='block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-sm placeholder:invisible focus:placeholder:visible'
        placeholder="Add todo and press 'Enter' key to submit"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={onKeyDown}
        required
      />
      <label
        htmlFor='todo'
        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
      >
        Todo
      </label>
    </div>
  );
};

export default AddTodoField;
