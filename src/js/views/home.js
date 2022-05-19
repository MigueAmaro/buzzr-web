import React, {useContext} from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import Chat from "../component/chat.jsx"
import PrivateChat from "../component/privateChat.jsx";

export const Home = () => {
	const {store} = useContext(Context)
	return(
		<>
		{store.token == "" ? 
		<div className="text-center mt-5">
			<h1>Trabajando en Buzzr App, vuelva mas tarde</h1>
		</div>
		:
		<div>
			{/* <Chat /> */}
			<PrivateChat/>
		</div>
		}
		</>
	)
};
