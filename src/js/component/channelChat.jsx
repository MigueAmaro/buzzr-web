import React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import { useParams } from "react-router";
import { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';


const endPoint = process.env.ENDPOINT;
let socket = io.connect(`${endPoint}`);

const ChannelChat = () => {
    const {store, actions} = useContext(Context)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([""])
    let params = useParams()

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            socket.emit("channel", { "msg": message, "channel": params.name, "username": store.userInfo.username});
            setMessage("");
        }
    }

    const getMessages = () => {
        socket.on("mensaje", (msg) => {
            setMessages([...messages, msg])
        })
        actions.handleMessages(params.name)
    }

    useEffect(() => {
        socket.emit("join", { "channel": params.name })
        getMessages();
    }, [messages])

    return (
        <div className=''>
            <div className='bg-dark p-2'>
                <ul>
                    {store.messages.length > 0 &&
                        store.messages.map((msg)=>{
                            return(
                                <li key={msg.id} className={(store.userInfo.username == msg.username ? "my_messages" : "other_messages")}>
                                    {msg.username}: {msg.msg}, {msg.date}
                                </li>
                            )
                        })}
                </ul>
            </div>
            <div className='d-flex justify-content-end'>
                <input
                    value={message}
                    name="message"
                    onChange={(e) => { setMessage(e.target.value) }}
                    onKeyDown={(e) => { handleKeyDown(e) }}
                    type="text" className='chat_input col-6'
                ></input>
            </div>
        </div>
    );
};

export default ChannelChat;