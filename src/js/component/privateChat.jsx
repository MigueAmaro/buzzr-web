import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import {Context} from "../store/appContext"

const endPoint = process.env.ENDPOINT;
const id = localStorage.getItem("id")
let privateSocket = io.connect(`${endPoint}`);

const PrivateChat = () => {
    const [messages, setMessages] = useState(["Hello And Welcome"]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState('')

    
    const getMessages = () => {
        privateSocket.on("new_private_msg", (msg) => {
            console.log("nothing to see here")
            alert(msg)
            setMessages([...messages, msg]);
        });
    };
    
    // On Change
    const onChange = (e) => {
        if(e.target.name == "username"){
            setUsername(e.target.value)
        }else{
            setMessage(e.target.value);
        }
    };
    
    // On Enter
    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            privateSocket.emit("private_message", {'username': username, 'id': id, 'msg': message });
            console.log(privateSocket.emit("private_message", {'username': username, 'msg': message }))
            setMessage("");
            setUsername('');
        }
    };

    // On Click
    const onClick = () => {
        if (message !== "") {
            socket.emit("message", message);
            setMessage("");
        } else {
            alert("Please Add A Message");
        }
    };
    
    useEffect(() => {
        getMessages();
        privateSocket.emit("login", id)
    }, [messages.length]);
    
    return (
        <>
            {messages.length > 0 &&
                messages.map((msg) => (
                    <div key={Math.random() + Math.random() + Math.random()}>
                        <p key={Math.random() + Math.random() + Math.random()}>
                            {msg}
                        </p>
                    </div>
                ))}
            <p>Username</p>
            <input
                className="me-2"
                value={username}
                name="username"
                onChange={(e) => onChange(e)}
                onKeyDown={(event) => handleKeyDown(event)}
            />
            <p className="mt-2">Message</p>
            <input
                value={message}
                name="message"
                onChange={(e) => onChange(e)}
                onKeyDown={(event) => handleKeyDown(event)}
            />
            <button onClick={() => onClick()}>Send Message</button>
        </>
    );
};

export default PrivateChat;