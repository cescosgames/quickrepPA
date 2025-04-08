import { useAtom, useAtomValue } from 'jotai';
import React, { useState } from 'react'
import { isResult } from '../atoms';

const ProgressButton = ({ moveForward, moveBackward, inputRef, isValidSearch }) => {
    const isForward = useAtomValue(isResult);

  return (
    <>      
    {isForward ?
        <button 
            disabled={!isValidSearch}
            className={`custom-button px-10 py-2`}
            onClick={() => {
                if (isForward) {
                    moveForward(inputRef.current.value.trim());
                } else {
                    moveBackward();
                }
            }}
            >
                {/* chevron icon from heroicons */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className={`transition-all size-6 ${!isForward ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
        </button>
        :
        <button 
            className={`custom-button px-10 py-2`}
            onClick={() => {
                if (isForward) {
                    console.log(isValidSearch);
                    moveForward(inputRef.current.value.trim());
                } else {
                    moveBackward();
                }
            }}
            >
                {/* chevron icon from heroicons */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className={`transition-all size-6 ${!isForward ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
        </button>
    }
    </>
  )
}

export default ProgressButton