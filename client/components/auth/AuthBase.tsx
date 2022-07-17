import React from 'react';
import Portal from '../Portal';
import Login from './Login';
import Register from './Register';

export const AuthBase = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) => {
  const [tab, setTab] = React.useState(1);

  const condition = (current: number) => {
    if (current !== tab) {
      return 'border-transparent hover:text-gray-600 hover:border-gray-300';
    }
    return 'text-blue-600 border-blue-600';
  };

  return (
    <Portal>
      <div
        id='defaultModal'
        className={`fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center flex bg-transparent ${
          open ? '' : 'invisible'
        }`}
      >
        <div className='relative w-full h-full max-w-md p-4 md:h-auto'>
          <div className='relative bg-gray-100 rounded-lg shadow-md mt-20'>
            <div className='flex items-start justify-between text-sm font-medium text-center text-gray-500 border-b border-gray-200'>
              <ul className='flex flex-wrap -mb-px'>
                <li className='mr-2'>
                  <button
                    onClick={() => setTab(1)}
                    className={`inline-block p-4 rounded-t-lg border-b-2 ${condition(
                      1
                    )}`}
                  >
                    Login
                  </button>
                </li>
                <li className='mr-2'>
                  <button
                    onClick={() => setTab(2)}
                    className={`inline-block p-4 rounded-t-lg border-b-2 ${condition(
                      2
                    )}`}
                  >
                    Register
                  </button>
                </li>
              </ul>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center mt-3 mr-3'
                onClick={() => setOpen(false)}
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='p-6 space-y-6'>
              {tab === 1 ? <Login /> : <Register />}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
