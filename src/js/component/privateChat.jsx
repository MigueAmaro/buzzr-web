import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { Context } from "../store/appContext"
import { useParams } from "react-router";
import { Link } from "react-router-dom";


const endPoint = process.env.ENDPOINT;
const id = localStorage.getItem("id")
let privateSocket = io.connect(`${endPoint}`);

const PrivateChat = () => {
    const { store, actions } = useContext(Context)

    const [messages, setMessages] = useState(["Hello And Welcome"]);
    const [message, setMessage] = useState("");

    let params = useParams()

    const getMessages = () => {
        privateSocket.on("new_private_msg", (msg) => {
            console.log("nothing to see here")
            setMessages([...messages, msg]);
        });
        actions.handlePrivateMessages(params.username)
    };

    // On Change
    const onChange = (e) => {
        setMessage(e.target.value);

    };

    // On Enter
    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            privateSocket.emit("private_message", { 'username': params.username, 'id': store.userInfo.id, 'msg': message });
            setMessage("");
            actions.handlePrivateMessages(params.username)
        }
    };

    // On Click
    const onClick = () => {
        if (message !== "") {
            privateSocket.emit("private_message", { 'username': params.username, 'id': store.userInfo.id, 'msg': message });
            setMessage("");
        } else {
            alert("Please Add A Message");
        }
    };

    useEffect(() => {
        getMessages();
        privateSocket.emit("login", id)
    }, [messages]);

    return (
        <>
            <div className="d-flex">
                <ul>
                    <li>Channels</li>
                    {store.channels.map((channel) => {
                        return (
                            <li key={channel.id}><Link onClick={() => { getMessages(channel.name) }} to={`/channelchat/${channel.name}`}>{channel.name}</Link></li>
                        )
                    })}
                </ul>
                <ul>
                    {store.messages.length > 0 &&
                        store.messages.map((msg) => {
                            return (
                                <li key={msg.id}>
                                    {msg.username_from}: {msg.msg}, {msg.date}
                                </li>
                            )
                        }

                        )}
                </ul>
            </div>
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