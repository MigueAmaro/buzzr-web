import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { Context } from "../store/appContext"
import { Helmet } from "react-helmet"
import { useParams } from "react-router";
import { Link } from "react-router-dom";



const endPoint = process.env.ENDPOINT;
const id = localStorage.getItem("id")
let privateSocket = io.connect(`${endPoint}`);

const PrivateChat = () => {
    const { store, actions } = useContext(Context)
    let params = useParams()

    const [messages, setMessages] = useState(["Hello And Welcome"]);
    const [message, setMessage] = useState("");


    const getMessages = () => {
        actions.handlePrivateMessages(params.id)
        privateSocket.on("new_private_msg", (msg) => {
            setMessages([...messages, msg]);
        });
    };

    // On Change
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    // On Enter
    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            privateSocket.emit("private_message", { 'username': params.username, 'id': id, 'msg': message });
            setMessage("");
        }
    };

    // On Click
    const onClick = () => {
        if (message !== "") {
            privateSocket.emit("private_message", { 'username': params.username, 'id': id, 'msg': message });
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
            <div className='row d-flex justify-content'>
                <Helmet>
                    <style>{'body {background-color: rgba(33,37,41);}'}</style>
                </Helmet>
                <div className='channel_title'>
                    <h2>{params.username}</h2>
                </div>
                <div className="col-2 channels_and_users"></div>
                <div className='bg-dark col-8 chat_body'>
                    <ul>
                        <li>Titulo del chat: {params.name}</li>
                        {store.messages.length > 0 &&
                            store.messages.map((msg) => {
                                return (
                                    <div>
                                        {store.userInfo.username == msg.username_from ?
                                            <li key={msg.id} className="my_messages">
                                                <div className='d-flex justify-content-end'>{msg.username_from}</div>
                                                <div className='row'><div className='col-2'>{msg.date}</div> <div className='d-flex justify-content-center align-self-center col-10'>{msg.msg}</div></div>
                                            </li>
                                            :
                                            <li key={msg.id} className="other_messages">
                                                <div className='d-flex justify-content-start'>{msg.username_from}</div>
                                                <div className='row'> <div className='d-flex justify-content-center align-self-center col-10'>{msg.msg}</div><div className='col-2'>{msg.date}</div></div>
                                            </li>
                                        }
                                    </div>
                                )
                            })}
                    </ul>
                </div>
                <div className="col-2 channels_and_users"></div>
            </div>
            <div className='row'>
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
                        onClick()
                    }}><i className="far fa-paper-plane"></i></button>
                </div>
                <div className="col-2"></div>
            </div>
        </>
    );
};

export default PrivateChat;