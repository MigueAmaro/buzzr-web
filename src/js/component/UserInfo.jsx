import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext.js";
import { Helmet } from "react-helmet"


const UserInfo = () => {
    const { store, actions } = useContext(Context)

    const [info, setinfo] = useState({
        email: store.userInfo.email,
        first_name: store.userInfo.first_name,
        last_name: store.userInfo.last_name,
        username: store.userInfo.username
    })

    return (
        <>
            <Helmet>
                <style>{'body {background-color: rgba(33,37,41);} '}</style>
            </Helmet>

            <div className='container edit_form'>
                <h3 className='mb-4'>Edit your profile</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                            onChange={(event) => setinfo({ ...info, [event.target.id]: event.target.value })}
                            value={info.email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">First Name:</label>
                        <input type="text" className="form-control" id="first_name" aria-describedby="emailHelp"
                            onChange={(event) => setinfo({ ...info, [event.target.id]: event.target.value })}
                            value={info.first_name}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name:</label>
                        <input type="text" className="form-control" id="last_name" aria-describedby="emailHelp"
                            onChange={(event) => setinfo({ ...info, [event.target.id]: event.target.value })}
                            value={info.last_name}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username:</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp"
                            onChange={(event) => setinfo({ ...info, [event.target.id]: event.target.value })}
                            value={info.username}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-success w-100"
                        onClick={() => actions.handleEdit(info)}>Edit information</button>
                </form>
            </div>
        </>
    );
};

export default UserInfo;