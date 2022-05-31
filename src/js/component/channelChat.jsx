import React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import { useParams } from "react-router";
import { useEffect } from 'react';


const endPoint = process.env.ENDPOINT;
let socket = io.connect(`${endPoint}`);

const ChannelChat = () => {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([""])
    let params = useParams()

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            socket.emit("channel", { "msg": message, "channel": params.name });
            setMessage("");
        }
    }

    const getMessages = () => {
        console.log("me ejecuto")
        socket.on("mensaje", (msg) => {
            console.log("socket.on")
            setMessages([...messages, msg])
        })
    }

    useEffect(() => {
        socket.emit("join", { "channel": params.name })
        getMessages();
    }, [messages])

    return (
        <div>
            <div>
                {messages.length > 0 &&
                    messages.map((msg) => (
                        <div key={Math.random() + Math.random() + Math.random()}>
                            <p key={Math.random() + Math.random() + Math.random()}>
                                {msg}
                            </p>
                        </div>
                    ))}
            </div>
            <input
                value={message}
                name="message"
                onChange={(e) => { setMessage(e.target.value) }}
                onKeyDown={(e) => { handleKeyDown(e) }}
            ></input>
        </div>
    );
};

export default ChannelChat;