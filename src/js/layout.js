import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import UserInfo from "./component/UserInfo.jsx";
import Chat from "./component/chat.jsx";
import PrivateChat from "./component/privateChat.jsx";
import ChannelChat from "./component/channelChat.jsx";
import NotFound from "./views/404.js"

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/chat" element={<Chat />} />
						<Route path="/privatechat/:username/:id" element={<PrivateChat />} />
						<Route path="/profile" element={<UserInfo />} />
						<Route path="/channelchat/:name" element={<ChannelChat/>}/>
						<Route path="*" element={<NotFound/>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);