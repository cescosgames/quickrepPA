import React from 'react'

export const AboutModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="relative bg-usa-white p-6 rounded-lg shadow-lg max-w-2xs w-full flex justify-center items-center flex-col">
          <div>{children}</div>
          {/* <div className='absolute h-6 w-6 bg-red-500 rounded-bl-lg rounded-tr-lg right-0 top-0 flex items-center justify-center cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div> */}
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-usa-white px-10 py-2 rounded-full hover:bg-usa-red transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
};