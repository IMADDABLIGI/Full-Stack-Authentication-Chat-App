import React, { useContext } from 'react'
import ProfileContext from '../Authentication/ProtectedRoute';
import CollectionsIcon from '@mui/icons-material/Collections';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';

function ConvoSubmit() {

const iconStyles = {height:"30px", width:"30px"};
const {socket, setSocket, user} = useContext(ProfileContext);
const receiver = user === "Imad" ? "Simo": "Imad";

const createSocket = (message) => {
    const userSocket = new WebSocket("ws://localhost:8000/ws/api/");
    userSocket.onopen = function () {
        console.log('WebSocket connection restablished');
        setSocket(userSocket);
        userSocket.send(
            JSON.stringify({
            sender: user,
            message: message,
            receiver: receiver,
            }),
        );
    };
};

const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (message) {
    if (!socket)
        createSocket(message);
    else
        socket.send(
        JSON.stringify({
            sender: user,
            message: message,
            receiver: receiver,
            }),
        );
    }
    e.target.reset();
};

    return (
        <form onSubmit={handleSubmit} className="flex items-center absolute h-[70px] w-[90%] shadow-lg rounded-2xl border bottom-10 left-1/2 transform -translate-x-1/2 px-6 bg-white gap-5">
        <CollectionsIcon style={iconStyles} className=' text-primary '/>
        <EmojiEmotionsIcon style={iconStyles} className=' text-primary '/>
        <input 
            type="text" 
            name="message" 
            className="flex placeholder:text-primary text-2xl w-[80%] h-[40px] outline-none focus:border-none" 
            autoFocus
            placeholder='Message...'
        />
        <button type="submit">
            <SendIcon type="submit" style={iconStyles} className='ml-auto text-primary'/>
        </button>
        </form>
    )
}

export default ConvoSubmit
