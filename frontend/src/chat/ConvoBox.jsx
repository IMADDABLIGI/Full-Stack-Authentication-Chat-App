import React, { useState } from 'react'

function ConvoBox(props) {

    const { info, isSelected, onSelect } = props;

  return (
    <div className={`flex items-center mt-[0px] h-[100px] w-full pl-5 gap-[25px] relative  ${isSelected && "bg-gray-100"} `} onClick={onSelect}>
        <img src={info.avatar} className='ml-0' style={{width: "75px", height: "75px"}}/>
        <div className='flex flex-col justify-center'>
            <h2 className='text-primary text-xl font-bold'> {info.userName} </h2>
            <p className='text-gray-400 text-md'> {info.recentText} </p>
        </div>
        <p className='flexx text-gray-400 text-xs w-5 h-5 absolute top-6 right-6'> {info.time} </p>
        {info.messagesCount > 0 && 
            <p className='flexx text-white text-xs bg-primary rounded w-5 h-5 absolute bottom-5 right-5'> {info.messagesCount} </p>
        }
    </div>
  )
}

export default ConvoBox
