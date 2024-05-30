import { useState } from "react";
//import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import io from "socket.io-client";

const socket = io("http://localhost:5173/api");

function Chat() {
  const [chat, setChat] = useState("");
  const [output, setOutput] = useState("Output");

  socket.on("connect", () => {
    console.log("server connected");
  });

  socket.on("chat", (data) => {
    console.log(data);
    setOutput(`Token:${data.token} Msg:${data.msg}`);
  });

  function sendMessage() {
    socket.emit("msg", chat);
  }

  return (
    <>
      <div className="border bg-blue-500">
        <textarea
          className="text-black"
          onChange={(e) => setChat(e.target.value)}
          id="chat-input"
          rows="3"
        ></textarea>
        <button onClick={sendMessage}>Send Chat</button>
      </div>

      <h1>{output}</h1>
    </>
  );
}

export default Chat;
