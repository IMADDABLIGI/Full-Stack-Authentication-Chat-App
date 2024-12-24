import React, { useContext, useEffect, useState } from 'react'
import ProfileContext from '../Authentication/ProtectedRoute';

function ConvoBox(props) {

  const { info, isSelected, onSelect } = props;
  const {user} = useContext(ProfileContext);
  const receiver = user === "Imad" ? "Simo" : "Imad";
  // const [cases, setCase] = useState(false);
  const cases = receiver === "Imad" || receiver === "Simo";
  const [time, setTime] = useState("");
  const [lmsg, setLmsg] = useState("");

  useEffect(()=>{
    const get_last_convo = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/get__last_convo/${user}/${receiver}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
        if (response.ok){
          const resData = await response.json();
          setTime(resData.data.time);
          setLmsg(resData.data.message);
        }
      } catch (error) {
        alert(error)
      }
    }
    if (user && (info.userName === "Imad" || info.userName === "Simo"))
      get_last_convo();

  },[user])

  return (
    <div className={`flex items-center mt-[0px] h-[100px] w-full pl-5 gap-[25px] relative  ${isSelected && "bg-gray-100 border-r-4 border-r-gray-300" } `} onClick={onSelect}>
        <img src={info.avatar} className='ml-0' style={{width: "75px", height: "75px"}}/>
        <div className='flex flex-col justify-center'>
            <h2 className='text-primary text-xl font-bold'> {info.userName} </h2>
        { 
          !isSelected && 
            <p className='text-gray-400 text-md'> { cases ?  lmsg : info.recentText } </p>
        }
        </div>
        {
          !isSelected && 
          <p className='flexx text-gray-400 text-xs w-5 h-5 absolute top-6 right-6'> { cases ?  time : info.time} </p>
        }
        {info.messagesCount > 0 && 
            <p className='flexx text-white text-xs bg-primary rounded w-5 h-5 absolute bottom-5 right-5'> {info.messagesCount} </p>
        }
    </div>
  )
}

export default ConvoBox
