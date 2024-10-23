import React, { useContext } from 'react'
import ProfileContext from '../Authentication/ProtectedRoute';

function Home() {

  const {socket, setSocket} = useContext(ProfileContext);

    const createSocket = (message) => {
      const userSocket = new WebSocket('ws://127.0.0.1:8000/ws/api/');
      userSocket.onopen = function() {
          setSocket(userSocket)
          userSocket.send(JSON.stringify({ message }));
      };
      userSocket.onmessage = function(event) {
          const data = JSON.parse(event.data)
          console.log('Message from server:', data.message);
      };
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      const message = e.target.message.value;
      if (message){
        if (!socket)
          createSocket(message);
        else
          socket.send(JSON.stringify({ message }));
      }
      e.target.reset(); // Reset the form
    };
  
    return (
      <div className='home--page'>
        <h1>Let's chat!</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="message" />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }

export default Home
