import React from 'react'

function ChatLayout() {
  return (
    <div className="flex border-[2px] border-blue-600 h-full w-full">
        <div className="flex flex-col border border-purple-400 w-[30%]"></div>
        <div className="flex flex-col border border-orange-400 w-[70%]"></div>
    </div>
  )
}

export default ChatLayout
