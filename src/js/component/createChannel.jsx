import React, {useState, useContext} from 'react';
import {Context} from "../store/appContext"
import io from "socket.io-client";

const endPoint = process.env.ENDPOINT;
let socket = io.connect(`${endPoint}`);

const CreateChannel = () => {
    const [channel, setChannel] = useState("")
    const {actions, store} = useContext(Context)

    return (
        <>
            <button type="button" className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="fas fa-plus"></i>
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal header */}
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Create Channel</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {/* Login Form */}
                            <div className="form-login-register row">
                                <p className="login-title">Name:</p>
                                <input
                                    className="input-login-register"
                                    type="text"
                                    name="channel"
                                    placeholder="channel's name"
                                    value={channel}
                                    onChange={(e)=>{setChannel(e.target.value)}}/>
                            </div>
                        </div>
                        {/* Modal buttons */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    socket.emit("create_channel", {"username": store.userInfo.username, "name": channel})
                                }}
                                >Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateChannel;