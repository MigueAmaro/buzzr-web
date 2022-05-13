import React, { useContext, useEffect } from 'react';
import { Context } from "../store/appContext.js";

const UserInfo = () => {
    const { store, actions } = useContext(Context)
    let info = {}
    const handleUser = async () =>{
        try{
            let response = await fetch(`${store.urlBase}/user/${store.id}`,{
                method: 'GET',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${store.token}`
                }
            })
            if(response.ok){
                let data = await response.json()
                info = data
                return info
            }
            else{
                console.log(response.json())
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        handleUser()
    },[])


    return (
        <div>
            <p> Hola {info?.username}</p>
        </div>
    );
};

export default UserInfo;