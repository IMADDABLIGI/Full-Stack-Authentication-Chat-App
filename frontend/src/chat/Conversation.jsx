import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CollectionsIcon from '@mui/icons-material/Collections';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';


const ConvoHeader = (props) => {
  const {info} = props;

  const iconStyles = {height:"55px", width:"55px"};

  return (
    <div className='flex justify-between h-[85px] pl-[50px] pr-[20px] shadow-bottom'>
      <div className='flex items-center gap-3'>
        <img src={info.avatar} style={iconStyles} />
        <div className='flex flex-col'>
          <h3 className='text-primary text-xl font-bold'> {info.userName} </h3>
          <p className='text-gray-300 text-xs'> Active Now </p>
        </div>
      </div>
      <div className='flex items-center gap-8'>
        <CallIcon className='text-primary ml-auto' style={{height:"30px", width:"30px"}}/>
        <MoreVertIcon className='text-primary ' style={{height:"30px", width:"30px"}}/>
      </div>
    </div>
  )
}

function Conversation(props) {

  const {info} = props;
  const iconStyles = {height:"30px", width:"30px"};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting...");
  }

  return (
    <div className="flex flex-col border-[2px] border-gray-300 w-[70%] gap-1">
      <ConvoHeader info={info}/>
      <div className='flex bg-[#E9FDFF] h-full relative w-[100%]'>
        
        <form onSubmit={handleSubmit} className="flex items-center absolute h-[70px] w-[90%] shadow-lg rounded-2xl border bottom-20 left-1/2 transform -translate-x-1/2 px-6 bg-white gap-5">
          <CollectionsIcon style={iconStyles} className=' text-primary '/>
          <EmojiEmotionsIcon style={iconStyles} className=' text-primary '/>
          <input 
            type="text" 
            name="message" 
            className="flex border-none placeholder:text-primary text-2xl w-[80%] h-[40px]" 
            autoFocus
            placeholder='Message...'
          />
          <button type="submit">
            <SendIcon type="submit" style={iconStyles} className=' ml-auto text-primary'/>
          </button>
        </form>

      </div>

    </div>
  )
}

export default Conversation


// #E9FDFF
// #D1E8E0
// #E6F4F1