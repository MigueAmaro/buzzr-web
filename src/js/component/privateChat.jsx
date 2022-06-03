import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { Context } from "../store/appContext"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


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
            <div>
                <Helmet>
                    <style>{'body {background-color: rgba(33,37,41);}'}</style>
                </Helmet>
                <div className='channel_title'>
                    <h3 className="m-0">{params.username}</h3>
                </div>

                <div className="channel_view">
                    <div className="col-2 channels_and_users">
                        <ul>
                            <li>Channels</li>
                            {store.channels.map((channel) => {
                                return (
                                    <li key={channel.id}><Link onClick={() => { getMessages(channel.name) }} to={`/channelchat/${channel.name}`}>{channel.name}</Link></li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="bg-dark col-8 chat_body">
                        <ul>
                            {store.messages.length > 0 &&
                                store.messages.map((msg) => {
                                    return (
                                        <div>
                                            {store.userInfo.username == msg.username_from ? (
                                                <li key={msg.id} className="my_messages">
                                                    {msg.username_from}: <br/>
                                                    {msg.msg}, {msg.date}
                                                </li>
                                            ) : (
                                                <li key={msg.id} className="other_messages">
                                                    {msg.username_from}: <br/>
                                                    {msg.msg}, {msg.date}
                                                </li>
                                            )}
                                        </div>
                                    )
                                })}
                        </ul>
                    </div>

                    <div className="col-2 channels_and_users">
                        <ul>
                            <li>User</li>
                            <li>{params.username}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="channel_view">
                <div className="col-2"></div>
                <div className='col-8 d-flex justify-content-center align-items-end'>
                    <input
                        value={message}
                        name="message"
                        className='chat_input col-10 mt-4'
                        onChange={(e) => onChange(e)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                    <button
                    className='send_button btn btn-outline-primary' 
                    onClick={() => onClick()}>
                        <i className="far fa-paper-plane"></i>
                    </button>
                </div>
                <div className="col-2"></div>
            </div>
        </>
    );
};

export default PrivateChat;