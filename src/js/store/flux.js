const getState = ({ getStore, getActions, setStore }) => {
	return {

		store: {
			token: localStorage.getItem("token") || "",
			// Cambiar la urlBase segun se necesite
			urlBase: "http://127.0.0.1:5000",
			// urlBase: "https://5000-migueamaro-buzzrapi-0zwwoy345m7.ws-us44.gitpod.io",
			id: localStorage.getItem("id") || "",
			data: {}
		},

		actions: {

			handleLogin: async (login) => {
				const store = getStore();
				try {
					const response = await fetch(`${store.urlBase}/login`, {
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(login)
					})
					const data = await response.json()
					if (response.ok) {
						setStore({
							...store,
							token: data.token
						})
						localStorage.setItem("token", data.token)
						setStore({
							...store,
							id: data.user_id
						})
						localStorage.setItem("id", data.user_id)
					}
				}catch (error) {
					console.log(error)
				}
			},
			
			signUp: async (email, password, nombre, apellido, username) => {
				const store = getStore()
				const actions = getActions()
				if(email.trim() == "" || password.trim() == "" || nombre.trim() == "" || apellido.trim() == "" || username.trim() == ""){
					alert('Debe llenar todos los campos')
					console.log("Debe llenar todos los campos")
				}
				else{
					if(actions.checkEmail(email) == false){
						return alert("correo invalido")
					}
					else{
					let data = {
						"email": email,
						"password": password,
						"name": nombre,
						"last_name": apellido,
						"username": username
					}
					try{
						let response = await fetch(`${store.urlBase}/signup`,{
							method: 'POST',
							body: JSON.stringify(data),
							headers:{
								'Content-Type': 'application/json'
							}
						})
						if(response.ok){
							let login = {
								"email": email,
								"password": password
							}
							actions.handleLogin(login)
						}
						else{
							console.log(response)
						}
					}
					catch(error){
						console.log(error)
					}
				}
			}
			},

			handleLogout: () =>{
				let store = getStore();
				setStore({
					...store,
					token: ""
				})
				localStorage.removeItem("token")
				setStore({
					...store,
					id: ""
				})
				localStorage.removeItem("id")
			},

			checkEmail: (correo) =>{
				let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
				let isOk = expReg.test(correo)
				if(!isOk){
					return false
				}else{
					return true
				}
			},

			

			handleUser : async () => {
				const store = getStore()
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
						setStore({
							...store,
							data: data
						})
					}
					else {
						console.log(response.json())
					}
				}
				catch (error) {
					console.log(error)
				}
			}

			}
		}
	};
export default getState;