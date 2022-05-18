import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import {Context} from "../store/appContext"

const endPoint = process.env.ENDPOINT;
const id = localStorage.getItem("id")
let socket = io.connect(`${endPoint}`, {query:`user=${id}`});

const Chat = () => {
	const {store, actions} = useContext(Context);

	const [messages, setMessages] = useState(["Hello And Welcome"]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		getMessages();
	}, [messages]);

	const getMessages = () => {
		socket.on("message", (msg) => {
			setMessages([...messages, msg]);
		});
		actions.handleMessages()
	};

	// On Change
	const onChange = (e) => {
		setMessage(e.target.value);
	};

	// On Enter
	const handleKeyDown = (event) => {
		if (event.key == "Enter") {
			socket.emit("message", message);
			setMessage("");
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

	return (
		<div>
			<h1>Chat desde db:</h1>
			<ul>
				{store.messages == "" ? "Send a message to start a chat" : (
					store.messages.map((msg) =>{
					return (
						<li key={msg.id}>{msg.username}: {msg.msg}</li>
					)
				}))
				}
			</ul>
			<input
				value={message}
				name="message"
				placeholder="Send a message"
				onChange={(e) => onChange(e)}
				onKeyDown={(event) => handleKeyDown(event)}
			/>
			<button onClick={() => onClick()}>Send Message</button>
		</div>
	);
};

export default Chat;
