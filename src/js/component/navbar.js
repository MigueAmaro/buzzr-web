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
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>

			<div className="ml-auto">
				{store.token?.length > 0 ? (
					<div>
						<CreateChannel />
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
					</div>
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
