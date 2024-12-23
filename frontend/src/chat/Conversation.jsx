import React, { useContext, useEffect } from 'react'
import ProfileContext from '../Authentication/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import ConvoHeader from './ConvoHeader';
import ConvoSubmit from './ConvoSubmit';

function Conversation(props) {
  const {info} = props;
  const msgStyle = "self-end text-white bg-primary px-4 py-1 rounded-2xl text-xl"
  const msgStyle2 = "self-start text-primary bg-white px-4 py-1 rounded-2xl text-xl"
  const {socket, user} = useContext(ProfileContext);

  useEffect(()=>{
    
    const getConversation = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/get_conversation/${user}/`,
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
          // console.log("DATA :", resData.data);
        }
      } catch (error) {
        alert(error)
      }
    }
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "new_message"){
          getConversation()
          console.log("Message in Socket :", data.message);
        }
      }
    }
  },[socket])


  return (
    <div className="flex flex-col border-[2px] border-gray-300 w-[70%] gap-1 justify-center">
      <ConvoHeader info={info}/>
      <div className='flex justify-center bg-[#E9FDFF] h-full relative w-[100%] pt-5'>
        <div className='flex flex-col h-[82%] w-[90%] border border-gray-400 justify-end gap-2'>
          <p className={`${msgStyle}`}> Hi </p>
          <p className={`${msgStyle2}`}> Hi, how are u doing </p>
        </div>

        <ConvoSubmit />
      </div>

    </div>
  )
}

export default Conversation
