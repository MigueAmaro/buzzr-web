import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router";

import Login from "./Login.jsx"
import Register from "./Register.jsx";
import CreateChannel from "./createChannel.jsx";

export const Navbar = () => {
	let navegar = useNavigate()
	const { store, actions } = useContext(Context)
	return (
		<>
		{store.token?.length > 0 ? (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>

			<div className="ml-auto">
				
					<div>
						<CreateChannel/>
						<Link
						to={`/profile`}
						className="btn btn-primary me-2"
						onClick={() => actions.handleUser()}>
							Profile
						</Link>
						<button 
						type="button" 
						className="btn btn-danger"
						onClick={() => {
							actions.handleLogout()
							navegar("/")
							}}>
							<i className="fas fa-sign-out-alt"></i>
							</button>
					<button type="button" className="btn btn-primary" onClick={()=>{
						actions.handleChannels()
					}}>
						Get Channels
					</button>
					</div>
				
			</div>
		</nav>
		) : null}</>
	);
};
