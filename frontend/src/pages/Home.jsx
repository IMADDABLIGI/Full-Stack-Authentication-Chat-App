import React, { useContext } from "react";
import ProfileContext from "../Authentication/ProtectedRoute";
import { useNavigate } from "react-router-dom";

function Home() {
  const { socket, setSocket, messages, user } = useContext(ProfileContext);

  const createSocket = (message) => {
    const userSocket = new WebSocket("ws://127.0.0.1:8000/ws/api/");
    userSocket.onopen = function () {
      setSocket(userSocket);
      userSocket.send(
        JSON.stringify({
          sender: user,
          message: message,
        }),
      );
    };
    userSocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log("Message from server:", data.message);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (message) {
      if (!socket) createSocket(message);
      else
        socket.send(
          JSON.stringify({
            sender: user,
            message: message,
          }),
        );
    }
    e.target.reset();
  };

  return (
    <div className="home--page text-black">
      <h1 className="text-black">Let's chat!</h1>
      <form onSubmit={handleSubmit} className="flex gap-5">
        <input type="text" name="message" className="border border-black w-[100px]" autoFocus />
        <button type="submit" className= "border-gray-300 border-[5px] rounded w-[100px] bg-blue-500 text-white font-bold" >Send</button>
      </form>
      {messages.map((message, key) => {
        return (
          <p className="messages" key={key}>
            {" "}
            {message.sender} : {message.message}{" "}
          </p>
        );
      })}
    </div>
  );
}

export default Home;
