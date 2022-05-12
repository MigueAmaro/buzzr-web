import React from 'react';
import { useState, useContext } from 'react';
import { Context } from "../store/appContext";

const Register = () => {
    const {store, actions} = useContext(Context)
    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [nombre, setNombre] = useState("")
	const [apellido, setApellido] = useState("")
    const [username, setUsername] = useState("")

    const handleUser = (event) => {
		if (event.target.id == "correo") {
			setEmail(event.target.value)
		}
		else if (event.target.id == "contra") {
			setPassword(event.target.value)
		}
		else if (event.target.id == "nombre") {
			setNombre(event.target.value)
		}
		else if (event.target.id == "apellido") {
			setApellido(event.target.value)
		}
        else if (event.target.id == "username") {
            setUsername(event.target.value)
        }
	}

    return (
        <>
            <div className="btn-group">
							<button type="button" className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
								Sign Up
							</button>
							<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
								<div className="modal-dialog modal-dialog-centered">
									<div className="modal-content p-3">
										<form>
											<div className="mb-3">
												<label htmlFor="exampleInputEmail1" className="form-label">Email:</label>
												<input
													type="email"
													className="form-control"
													id="correo"
													aria-describedby="emailHelp"
													value={email}
													onChange={handleUser}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
												<input
													type="password"
													className="form-control"
													id="contra"
													value={password}
													onChange={handleUser}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="exampleInputEmail1" className="form-label">Nombre:</label>
												<input
													type="text"
													className="form-control"
													id="nombre"
													aria-describedby="emailHelp"
													value={nombre}
													onChange={handleUser}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="exampleInputEmail1" className="form-label">Apellido:</label>
												<input
													type="text"
													className="form-control"
													id="apellido"
													aria-describedby="emailHelp"
													value={apellido}
													onChange={handleUser}
												/>
											</div>
                                            <div className="mb-3">
												<label htmlFor="exampleInputEmail1" className="form-label">Username:</label>
												<input
													type="text"
													className="form-control"
													id="username"
													aria-describedby="emailHelp"
													value={username}
													onChange={handleUser}
												/>
											</div>
											<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{
                                                actions.signUp(email, password, nombre, apellido, username)
                                                setEmail("")
                                                setPassword("")
                                                setNombre("")
                                                setApellido("")
                                                setUsername("")
                                            }}>Sign Up</button>
										</form>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{
                                                setEmail("")
                                                setPassword("")
                                                setNombre("")
                                                setApellido("")
                                                setUsername("")
                                            }}>Close</button>
										</div>
									</div>
								</div>
							</div>
            </div>
        </>
    );
};

export default Register;