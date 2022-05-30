import React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import { useParams } from "react-router";
import { useEffect } from 'react';


const endPoint = process.env.ENDPOINT;
let socket = io.connect(`${endPoint}`);

const ChannelChat = () => {

    const [message, setMessage] = useState("")
	let params = useParams()

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
			socket.emit("channel_chat", {"msg": message, "channel": params.name});
			setMessage("");
		}
    }

    socket.on("get_channel_chat", (msg) =>{
        console.log(msg)
    })

    return (
        <div>
            <input 
            value={message}
            name="msg"
            onChange={(e) => {setMessage(e.target.value)}}
            onKeyDown={(e) => {handleKeyDown(e)}}
            ></input>
        </div>
    );
};

export default ChannelChat;