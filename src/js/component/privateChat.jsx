import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { Context } from "../store/appContext"

const endPoint = process.env.ENDPOINT;
const id = localStorage.getItem("id")
let privateSocket = io.connect(`${endPoint}`);

const PrivateChat = () => {
    const { store, actions } = useContext(Context)

    const [messages, setMessages] = useState(["Hello And Welcome"]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState('')


    const getMessages = () => {
        privateSocket.on("new_private_msg", (msg) => {
            console.log("nothing to see here")
            setMessages([...messages, msg]);
        });
    };

    // On Change
    const onChange = (e) => {
        if (e.target.name == "username") {
            setUsername(e.target.value)
        } else {
            setMessage(e.target.value);
        }
    };

    // On Enter
    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            privateSocket.emit("private_message", { 'username': username, 'id': id, 'msg': message });
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
        actions.handleAllUsers()
        privateSocket.emit("login", id)
    }, [messages]);


    return (
        <>
            <div className="d-flex">

                {store.allUsers.length > 0 ? (
                    <ul>
                        <li>Usuarios en el chat:</li>
                        {store.allUsers.map((user) => {
                            return (
                                <li
                                    key={user.id}
                                    onClick={() => actions.handlePrivateMessages(user.id)}>{user.username}</li>
                            )
                        })}
                    </ul>
                ) : (
                    <div>No hay usuarios en este chat</div>
                )}
                <ul>
                    {store.privateMessages.length > 0 &&
                        store.privateMessages.map((msg) => {
                            console.log(msg)
                            return(
                            <li key={msg.id}>
                                {msg.username_from}: {msg.msg}
                            </li>
                            )
                        }

                        )}
                </ul>
            </div>
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