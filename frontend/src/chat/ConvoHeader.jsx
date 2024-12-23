import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ConvoHeader(props) {
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


export default ConvoHeader
