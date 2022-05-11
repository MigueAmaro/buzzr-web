import React, {useState, useContext} from 'react';
import { Context } from "./../store/appContext";

const Login = () => {

    const { actions } = useContext(Context)

	const [login, setLogin] = useState({
		email: "",
		password: ""
	})


    return (
        <>
            {/* Button trigger modal Login */}
            <button type="button" className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Login
            </button>

            {/* Log in Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal header */}
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Log in</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {/* Login Form */}
                            <div className="form-login row">
                                <p className="login-title">Email:</p>
                                <input
                                    className="input-login"
                                    type="text"
                                    name="email"
                                    placeholder='Email'
                                    onChange={(event) => setLogin({ ...login, [event.target.name]: event.target.value })} />

                                <p className="login-title">Password:</p>
                                <input
                                    className="input-login"
                                    type="password"
                                    name="password"
                                    placeholder='Password'
                                    onChange={(event) => setLogin({ ...login, [event.target.name]: event.target.value })} />
                            </div>
                        </div>
                        {/* Modal buttons */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                                onClick={() => { actions.handleLogin(login) }}>Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;