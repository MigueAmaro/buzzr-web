import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext.js";

const UserInfo = () => {
    const { store, actions } = useContext(Context)

    const [info, setinfo] = useState({
        email: store.data.email,
        name: store.data.first_name,
        last_name: store.data.last_name,
        username: store.data.username
    })

    useEffect(() => {
        actions.handleUser()
    }, [])

    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                    onChange={(event) => setinfo({...info, [event.target.id]: event.target.value})}
                    value={info.email}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp"
                    onChange={(event) => setinfo({...info, [event.target.id]: event.target.value})}
                    value={info.name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last_name" aria-describedby="emailHelp"
                    onChange={(event) => setinfo({...info, [event.target.id]: event.target.value})}
                    value={info.last_name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp"
                    onChange={(event) => setinfo({...info, [event.target.id]: event.target.value})}
                    value={info.username}
                    />
                </div>
                <button type="button" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default UserInfo;