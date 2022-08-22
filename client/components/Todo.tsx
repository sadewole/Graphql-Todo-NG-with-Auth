import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Todo,
  useDeleteTodoMutation,
  User,
  useUpdateTodoMutation,
} from '../generated/graphql';
import GrabToDrag from './draggable/GrabToDrag';
import { Item } from '../interface';

type TodoProps = { item: Item<Todo>; isMe?: User | null; idx: number };
// type TodoProps = { item: Omit<Todo, 'user_id'>; isMe?: User | null };

const TodoList = ({ item, isMe, idx }: TodoProps) => {
  const [hovered, setHovered] = useState(false);
  const [todo, setTodo] = useState(item);
  const [editable, setEditable] = useState(false);
  const [_update, updateTodo] = useUpdateTodoMutation();
  const [_delete, deleteTodo] = useDeleteTodoMutation();

  const isOwner = isMe?.id === todo.user.id;

  const saveUpdatedTodo = async (data: {
    id: string;
    title: string;
    completed: boolean;
  }) => {
    const response = await updateTodo(data);
    if (response.error) {
      toast.error(response.error.graphQLErrors[0].message, {
        position: 'top-right',
        duration: 5000,
      });
    } else {
      toast.success('updated successfully', {
        position: 'top-right',
        duration: 5000,
      });
    }
  };

  const handleDeleteTodo = async () => {
    const response = await deleteTodo({ id: todo.id });
    if (!response.error) {
      toast.success('deleted successfully', {
        position: 'top-right',
        duration: 5000,
      });
    } else {
      toast.error(response.error.graphQLErrors[0].message, {
        position: 'top-right',
        duration: 5000,
      });
    }
  };

  const handleChange = (value: unknown, prop: string) => {
    setTodo((prev) => ({ ...prev, [prop]: value }));
  };

  const handleSubmit = async () => {
    if (!todo.title.length) {
      return toast.error('Item should not be empty', {
        position: 'top-right',
        duration: 5000,
      });
    }
    await saveUpdatedTodo({ ...todo });
    setEditable(false);
  };

  return (
    <GrabToDrag id={todo.id} idx={idx} isOwner={isOwner}>
      <div
        className={`py-2 px-4 flex items-start border rounded-lg hover:bg-gray-100 mb-4 ${
          todo.completed ? 'bg-gray-100' : ''
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className='flex flex-1 py-2'>
          <div className='flex items-center'>
            <input
              checked={todo.completed}
              id={todo.id}
              type='checkbox'
              disabled={editable || !isOwner}
              className='w-4 h-4 text-gray-500 cursor-pointer bg-gray-100 rounded border-gray-300 mr-4 peer'
              onChange={async (evt) => {
                handleChange(evt.target.checked, 'completed');
                await saveUpdatedTodo({
                  ...todo,
                  completed: evt.target.checked,
                });
              }}
            />
          </div>

          {!editable ? (
            <label
              htmlFor={todo.id}
              className='peer-checked:line-through peer-checked:text-gray-500'
            >
              {todo.title} <br />
              <em className='text-xs'>created by {todo.user.username}</em>
            </label>
          ) : (
            <input
              type='text'
              name='todo'
              id='todo'
              className='block px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600'
              value={todo.title}
              onChange={(evt) => handleChange(evt.target.value, 'title')}
              required
            />
          )}
        </div>
        {editable ? (
          <div className='flex items-center gap-2'>
            <button
              className='p-2 hover:bg-slate-200 text-green-500'
              onClick={handleSubmit}
            >
              <svg
                className='w-4 h-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 448 512'
                fill='currentColor'
              >
                <path d='M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z' />
              </svg>
            </button>
            <button
              type='button'
              className='text-red-500 p-2 hover:bg-slate-200'
              onClick={() => {
                setEditable(false);
                setTodo(item);
              }}
            >
              <svg
                className='w-4 h-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 320 512'
                fill='currentColor'
              >
                <path d='M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z' />
              </svg>
            </button>
          </div>
        ) : (
          <div
            className={`flex items-center gap-2 ${
              !hovered || !isOwner ? 'invisible' : ''
            }`}
          >
            <button
              className={`p-2 hover:bg-slate-200 hover:rounded-full ${
                todo.completed ? 'hidden' : ''
              }`}
              onClick={() => setEditable(true)}
            >
              <svg
                className='w-4 h-4'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
              >
                <path d='M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z' />
              </svg>
            </button>
            <button
              type='button'
              className='text-red-500 p-2 hover:bg-slate-200 hover:rounded-full'
              onClick={handleDeleteTodo}
            >
              <svg
                className='w-4 h-4'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 448 512'
              >
                <path d='M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z' />
              </svg>
            </button>
          </div>
        )}
      </div>
    </GrabToDrag>
  );
};

export default TodoList;
