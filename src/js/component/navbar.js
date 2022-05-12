import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

import Login from "./Login.jsx"
import Register from "./Register.jsx";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>

			<div className="ml-auto">
				{store.token?.length > 0 ? (
					<button 
					type="button" 
					className="btn btn-danger"
					onClick={() => actions.handleLogout()}>
						<i className="fas fa-sign-out-alt"></i>
						</button>
				) : (
						<>
							<Login />
							<Register />
						</>
					)}
			</div>
		</nav>
	);
};
