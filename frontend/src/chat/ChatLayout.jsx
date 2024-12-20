import React from 'react'
import Conversation from './Conversation'
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from './helpers/SearchBar';
import "../index.css"

function ChatLayout() {
  return (
    <div className="flex h-full w-full">
        <div className="flex flex-col w-[30%] pt-[70px]">
        <h1 className='text-primary text-4xl font-bold ml-[50px]'> Inbox </h1>
          <SearchBar />
          <div className='flex mt-[50px] h-[100px] w-full border border-primary'>
            
          </div>


        </div>
        <Conversation />
    </div>
  )
}

export default ChatLayout
