import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext.js";

const UserInfo = () => {
    const { store, actions } = useContext(Context)

    const [info, setinfo] = useState({})

    const handleUser = async () => {
        try {
            let response = await fetch(`${store.urlBase}/user/${store.id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                }
            })
            if (response.ok) {
                let data = await response.json()
                setinfo(data)
            }
            else {
                console.log(response.json())
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleUser()
    }, [])


    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                    value={info.email}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="email" className="form-control" id="name" aria-describedby="emailHelp"
                    value={info.first_name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                    <input type="email" className="form-control" id="last_name" aria-describedby="emailHelp"
                    value={info.last_name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="email" className="form-control" id="username" aria-describedby="emailHelp"
                    value={info.username}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default UserInfo;