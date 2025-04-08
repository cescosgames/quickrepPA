import { useAtomValue } from 'jotai'
import React from 'react'
import { isResult } from '../atoms'

const GuideText = ({ infoHeader, infoBody}) => {
  const isResultPage = useAtomValue(isResult)

  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
        <h1 className='text-white text-3xl w-3xs text-center'>{infoHeader}</h1>
        <p className={`text-center text-white justify-start ${!isResultPage ? 'text-2xl' : 'opacity-50'}`}>
        {infoBody.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
    </div>
  )
}

export default GuideText