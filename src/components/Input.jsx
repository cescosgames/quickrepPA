import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react';
import GuideText from './GuideText';
import ProgressButton from './ProgressButton';
import { useAtom } from 'jotai';
import { isValidSearch } from '../atoms';

const Input = ({ seeResult, newQuery }) => {
    const inputRef = useRef();
    const [isValidZip, setIsValidZip] = useAtom(isValidSearch);

    const checkIfValid = () => {
        const inputValue = inputRef.current.value.trim(); // get the input value
        if (/^\d{5}$/.test(inputValue)) { // Regex to check exactly 5 digits
            setIsValidZip(true);
        } else {
            setIsValidZip(false);
        }
    }

    return (
        // motion for poppingin
        <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <div className='h-full flex flex-col justify-center items-center min-h-100 gap-7'>
                {/* the explanation */}
                <GuideText infoHeader={`Step 1: Find Your Representative`} infoBody={`Enter your PA zip code below to find your rep!`}/>

                {/* the input field */}
                <div className="custom-input md:w-xs w-3xs">
                    <input
                    ref={inputRef}
                    type="text"
                    className="rounded-full w-full h-full text-black md:text-2xl text-xl p-3 focus:outline-1 focus:outline-usa-white text-center"
                    placeholder="Enter Your PA Zip Code"
                    onChange={checkIfValid}
                    maxLength={5}
                    />
                </div>

                {/* error message
                {!isValidZip ? 
                        <p className='text-red-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Please Enter A Valid PA zip code!</p>
                    : 
                        <></>} */}

                {/* the progress button */}
                <ProgressButton moveForward={seeResult} inputRef={inputRef} isValidSearch={isValidZip}/>
            </div>
        </motion.div>
    );
}

export default Input