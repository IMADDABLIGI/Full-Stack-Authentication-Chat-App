import React from 'react'
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ChatIcon from '@mui/icons-material/Chat';

function SideBar() {

  const svgStyles = {width: "45px", height: "45px"}

  return (
    <div className="flex flex-col rounded-tr-[20px] bg-primary h-full w-[120px] items-center py-[20px]">
      <ViewWeekIcon className='text-white' style={svgStyles} />
      <div className='flexx py-[25px] text-primary mt-[120px] w-[100%] bg-white'>
        <ChatIcon style={svgStyles} />
      </div>
      <div className='flexx py-[25px] text-white mt-[0px] w-[100%] '>
        <ChatIcon style={svgStyles} />
      </div>
      <div className='flexx py-[25px] text-white mt-[0px] w-[100%] '>
        <ChatIcon style={svgStyles} />
      </div>
      <div className='flexx py-[25px] text-white mt-[0px] w-[100%] '>
        <ChatIcon style={svgStyles} />
      </div>
    </div>
  )
}

export default SideBar
