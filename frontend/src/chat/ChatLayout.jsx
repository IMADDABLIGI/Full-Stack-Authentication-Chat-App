import React, { useContext, useEffect } from 'react'
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
import ProfileContext from '../Authentication/ProtectedRoute';
import EmptyCono from './EmptyCono';

function ChatLayout() {

  const {user} = useContext(ProfileContext);

  const user1 = {
    userName: "Imad",
    recentText: "Where ?",
    avatar: avatar2,
    messagesCount: 0,
    time: "17:47",
  }
  const user2 = {
    userName: "Simo",
    recentText: "ok",
    avatar: avatar,
    messagesCount: 0,
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

  const users = user === "Imad" ? [user2, user3, user4] : [user1, user3, user4];
  const [selectedUser, setSelectedUser] = useState(null);


  return (
    <div className="flex h-full w-full">
        <div className="flex flex-col w-[30%] pt-[70px] ">
          <h1 className='text-primary text-4xl font-bold ml-[50px]'> Inbox </h1>
          <SearchBar />
          {users.map((user, key)=> {
            return (
              <ConvoBox
                key={key}
                info={user}
                isSelected={selectedUser && selectedUser.userName === user.userName}
                onSelect={()=>setSelectedUser(user)}
              />
            )
          })}
            {/* <ConvoBox
                info={userReceive}
                isSelected={selectedUser && selectedUser.userName === userReceive.userName}
                onSelect={()=>setSelectedUser(userReceive)}
              />
              <ConvoBox
                info={user3}
                isSelected={selectedUser && selectedUser.userName === user3.userName}
                onSelect={()=>setSelectedUser(user3)}
              />
              <ConvoBox
                info={user4}
                isSelected={selectedUser && selectedUser.userName === user4.userName}
                onSelect={()=>setSelectedUser(user4)}
              /> */}

        </div>
        {selectedUser ?
          <Conversation info={selectedUser}/> : <EmptyCono />
        }
    </div>
  )
}

export default ChatLayout
