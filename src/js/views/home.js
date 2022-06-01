import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import Chat from "../component/chat.jsx"
import PrivateChat from "../component/privateChat.jsx";
import { Link } from "react-router-dom";
import io from "socket.io-client";


const endPoint = process.env.ENDPOINT;
let socket = io.connect(`${endPoint}`);


export const Home = () => {
	const { store } = useContext(Context)
	return (
		<>
			{store.token == "" ? (
				<div className="text-center mt-5">
					<h1>Trabajando en Buzzr App, vuelva mas tarde</h1>
				</div>
			) : (
				<div>
					{/* <Chat /> */}
					{/* <PrivateChat /> */}
					<ul>
						<li>Channels</li>
						{store.channels.map((channel) => {
							return (
								<li key={channel.id}><Link to={`/channelchat/${channel.name}`}>{channel.name}</Link></li>
							)
						})}
					</ul>
				</div>
			)

			}
		</>
	)
};
