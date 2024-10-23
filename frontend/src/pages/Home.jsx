import React, { useContext } from 'react'
import ProfileContext from '../Authentication/ProtectedRoute';

function Home() {

  const {socket} = useContext(ProfileContext);

    const handleSubmit = (e) => {
      e.preventDefault();
      const message = e.target.message.value;
      if (message)
        socket.send(JSON.stringify({ message }));
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
