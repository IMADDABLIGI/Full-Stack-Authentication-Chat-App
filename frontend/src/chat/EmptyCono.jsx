import React from 'react'

function EmptyCono() {
    return (
        <div className='flex w-[70%] h-[100%] border border-gray-300 bg-[#E9FDFF] items-center justify-center text-center'>
          <div>
            <h2 className='text-xl font-semibold mb-2'>No Conversations Selected</h2>
            <p className='text-gray-600'>Please select a conversation to start chatting.</p>
          </div>
        </div>
      );
    }

export default EmptyCono
