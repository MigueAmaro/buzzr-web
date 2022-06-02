import React from 'react';
import { useState } from 'react';
import io from "socket.io-client";
import { useParams } from "react-router";
import { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"


const endPoint = process.env.ENDPOINT;
let socket = io.connect(`${endPoint}`);

const ChannelChat = () => {
    const { store, actions } = useContext(Context)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([""])
    let params = useParams()

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            socket.emit("channel", { "msg": message, "channel": params.name, "username": store.userInfo.username });
            setMessage("");
        }
    }

    const handleClick = () => {
        if (message !== "") {
            socket.emit("channel", { "msg": message, "channel": params.name, "username": store.userInfo.username });
            setMessage("");
        } else {
            alert("Please Add A Message");
        }
    }

    const getMessages = (channel) => {
        socket.on("mensaje", (msg) => {
            setMessages([...messages, msg])
        })
        actions.handleMessages(channel)
        actions.handleChannelUsers(channel)
    }

    useEffect(() => {
        socket.emit("join", { "channel": params.name })
        getMessages(params.name);
    }, [messages])

    return (
        <>
            <div>
                <Helmet>
                    <style>{'body {background-color: rgba(33,37,41);}'}</style>
                </Helmet>
                <div className='channel_title'>
                    <h2>{params.name}</h2>
                </div>

                <div className='channel_view'>

                    <div className='col-2 channels_and_users'>
                        <ul>
                            <li>Channels</li>
                            {store.channels.map((channel) => {
                                return (
                                    <li key={channel.id}><Link onClick={() => { getMessages(channel.name) }} to={`/channelchat/${channel.name}`}>{channel.name}</Link></li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='bg-dark col-8 chat_body'>
                        <ul>
                            <li>Titulo del chat: {params.name}</li>
                            {store.messages.length > 0 &&
                                store.messages.map((msg) => {
                                    return (
                                        <div>
                                            {store.userInfo.username == msg.username ?
                                                <li key={msg.id} className="my_messages">
                                                    <div className='d-flex justify-content-end'>{msg.username}</div>
                                                    <div className='row'><div className='col-2'>{msg.date}</div> <div className='d-flex justify-content-center align-self-center col-10'>{msg.msg}</div></div>
                                                </li>
                                                :
                                                <li key={msg.id} className="other_messages">
                                                    <div className='d-flex justify-content-start'>{msg.username}</div>
                                                    <div className='row'> <div className='d-flex justify-content-center align-self-center col-10'>{msg.msg}</div><div className='col-2'>{msg.date}</div></div>
                                                </li>
                                            }
                                        </div>
                                    )
                                })}
                        </ul>
                    </div>
                    <div className='col-2 channels_and_users'>
                        <ul >
                            <li>Users</li>
                            {store.channelUsers.map((user) => {
                                return (
                                    <li key={user.id}><Link to={`/privatechat/${user.username}`}>{user.username}</Link></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='channel_view'>
                <div className="col-2"></div>
                <div className='col-8 d-flex justify-content-center align-items-end'>
                    <input
                        value={message}
                        name="message"
                        onChange={(e) => { setMessage(e.target.value) }}
                        onKeyDown={(e) => { handleKeyDown(e) }}
                        type="text" className='chat_input col-10 mt-4'
                    ></input>
                    <button type='button' className='send_button btn btn-outline-primary' onClick={() => {
                        handleClick()
                    }}><i className="far fa-paper-plane"></i></button>
                </div>
                <div className="col-2"></div>
            </div>
        </>
    );
};

export default ChannelChat;