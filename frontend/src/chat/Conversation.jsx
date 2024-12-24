import React, { useContext, useEffect, useState } from 'react'
import ProfileContext from '../Authentication/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import ConvoHeader from './ConvoHeader';
import ConvoSubmit from './ConvoSubmit';

function Conversation(props) {
  const {info} = props;
  const {socket, user} = useContext(ProfileContext);
  const receiver = user === "Imad" ? "Simo": "Imad";
  const [messages, setMessages] = useState([]);
  
  const getConversation = async () => {
    if(info.userName === "Imad" || info.userName === "Simo"){
      try {
        const response = await fetch(`http://localhost:8000/api/get_conversation/${user}/${receiver}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )
      if (response.ok){
        const resData = await response.json();
        setMessages(resData.data);
      }
    } catch (error) {
      alert(error)
    }
  }
  }
  useEffect(()=> {
    getConversation();
  },[])
  useEffect(()=>{
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "new_message"){
          getConversation()
        }
      }
    }
  },[socket])
  
  const senderStyle = "self-end text-white bg-primary px-5 py-1 rounded-2xl text-[20px]"
  const receiverStyle = "self-start text-primary bg-white px-5 py-1 rounded-2xl text-[20px]"
  
  return (
    <div className="flex flex-col w-[70%] h-[100%] justify-center shadow-left gap">
      <ConvoHeader info={info}/>
      <div className='flex justify-center bg-[#E9FDFF] relative h-[100%] w-[100%] pt-5'>
        <div className='flex flex-col-reverse h-[82.3%] w-[90%] self-end gap-2 overflow-y-auto absolute bottom-[16%]'>
          {messages.map((message, key)=>{
            if (message.sender === user)
              return(
                <div className='flex items-center gap-3 self-end' key={key}>
                  <p className='text-gray-300 text-[14px]'> {message.time} </p>
                  <p className={`${senderStyle}`} > {message.message} </p>
                </div>
              )
            else
              return (
                <div className='flex items-center gap-3 self-start' key={key}>
                  <p className={`${receiverStyle}`}> {message.message} </p>
                  <p className='text-gray-300 text-[14px]'> {message.time} </p>
                </div>
              )
          })}

        </div>

        <ConvoSubmit />
      </div>

    </div>
  )
}

export default Conversation
