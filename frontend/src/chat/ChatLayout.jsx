import React from 'react'
import Conversation from './Conversation'
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from './helpers/SearchBar';
import "../index.css"
import ConvoBox from './ConvoBox';
import avatar from "../assets/bg-pictures/user1.png"
import avatar2 from "../assets/bg-pictures/user2.png"
import avatar3 from "../assets/bg-pictures/user4.png"
import avatar4 from "../assets/bg-pictures/user5.png"
import { useState } from 'react';

function ChatLayout() {

  const user1 = {
    userName: "Imad",
    recentText: "Where ?",
    avatar: avatar2,
    messagesCount: 2,
    time: "17:47",
  }
  const user2 = {
    userName: "Simo",
    recentText: "ok",
    avatar: avatar,
    messagesCount: 1,
    time: "17:45",
  }
  const user3 = {
    userName: "Khaled",
    recentText: "not so much",
    avatar: avatar3,
    messagesCount: 0,
    time: "11:46",
  }
  const user4 = {
    userName: "Megan",
    recentText: "great",
    avatar: avatar4,
    messagesCount: 0,
    time: "11:45",
  }

  const users = [user1, user2, user3, user4];
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-full w-full">
        <div className="flex flex-col w-[30%] pt-[70px] shadow-right">
          <h1 className='text-primary text-4xl font-bold ml-[50px]'> Inbox </h1>
          <SearchBar />
          {users.map((user, key)=> {
            return (
              <ConvoBox
                key={key}
                info={user}
                isSelected={selectedUser === user.userName}
                onSelect={()=>setSelectedUser(user.userName)}
              />
            )
          })}


        </div>
        <Conversation info={user1}/>
    </div>
  )
}

export default ChatLayout
