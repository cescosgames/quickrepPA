import React, { useState } from 'react'
import { motion } from 'motion/react';
import GuideText from './GuideText';
import ProgressButton from './ProgressButton';

const Result = ({ newQuery, headerText, contactText }) => {
  return (
    // motion for poppingin
    <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
    >
        <div className='h-full flex flex-col justify-center items-center min-h-100 gap-7'>
            {/* the explanation */}
            <GuideText infoHeader={headerText} infoBody={contactText}/>

            {/* the progress button */}
            <ProgressButton moveBackward={newQuery}/>
        </div>
    </motion.div>
  )
}

export default Result