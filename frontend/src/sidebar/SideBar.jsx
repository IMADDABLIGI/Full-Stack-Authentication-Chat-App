import React, {useState} from 'react'
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';

function SideBar() {
  const svgStyles = { width: '40px', height: '40px' };
  
  // State to track the selected icon
  const [selectedIcon, setSelectedIcon] = useState('chat');

  const selected = "bg-white text-primary"
  const noSelected = "text-white hover:text-primary hover:bg-white transition-colors duration-200 ease-in"

  // Function to handle icon selection
  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
  };

  return (
    <div className="flex flex-col rounded-tr-[20px] bg-primary h-full w-[120px] items-center py-[20px]">
      <ViewWeekIcon className='text-white' style={svgStyles}/>
      <div 
        className={`flexx py-[25px] ${selectedIcon === 'chat' ? selected : noSelected} mt-[120px] w-[101%]`} 
        onClick={() => handleIconClick('chat')}
      >
        <ChatIcon style={svgStyles} />
      </div>
      <div 
        className={`flexx py-[25px] ${selectedIcon === 'call' ? selected : noSelected} w-[101%]`} 
        onClick={() => handleIconClick('call')}
      >
        <CallIcon style={svgStyles} />
      </div>
      <div 
        className={`flexx py-[25px] ${selectedIcon === 'groups' ? selected : noSelected} w-[101%]`} 
        onClick={() => handleIconClick('groups')}
      >
        <GroupsIcon style={svgStyles} />
      </div>
      <div 
        className={`flexx py-[25px] ${selectedIcon === 'settings' ? selected : noSelected} w-[101%]`} 
        onClick={() => handleIconClick('settings')}
      >
        <SettingsIcon style={svgStyles} />
      </div>
    </div>
  );
}

export default SideBar
