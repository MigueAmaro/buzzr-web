import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext.js";

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
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                    onChange={(event) => setinfo({...info, [event.target.id]: event.target.value})}
                    value={info.email}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">First Name:</label>
                    <input type="text" className="form-control" id="first_name" aria-describedby="emailHelp"
                    onChange={(event) => setinfo({...info, [event.target.id]: event.target.value})}
                    value={info.first_name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name:</label>
                    <input type="text" className="form-control" id="last_name" aria-describedby="emailHelp"
                    onChange={(event) => setinfo({...info, [event.target.id]: event.target.value})}
                    value={info.last_name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username:</label>
                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp"
                    onChange={(event) => setinfo({...info, [event.target.id]: event.target.value})}
                    value={info.username}
                    />
                </div>
                <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => actions.handleEdit(info)}>Submit</button>
            </form>
        </>
    );
};

export default UserInfo;