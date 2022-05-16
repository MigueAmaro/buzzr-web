import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const endPoint = process.env.ENDPOINT;
let socket = io.connect(`${endPoint}`);

const Chat = () => {
	const [messages, setMessages] = useState(["Hello And Welcome"]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		getMessages();
	}, [messages.length]);

	const getMessages = () => {
		socket.on("message", (msg) => {
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
			{messages.length > 0 &&
				messages.map((msg) => (
					<div key={Math.random() + Math.random() + Math.random()}>
						<p key={Math.random() + Math.random() + Math.random()}>
							{msg}
						</p>
					</div>
				))}
			<input
				value={message}
				name="message"
				onChange={(e) => onChange(e)}
				onKeyDown={(event) => handleKeyDown(event)}
			/>
			<button onClick={() => onClick()}>Send Message</button>
		</div>
	);
};

export default Chat;
