const getState = ({ getStore, getActions, setStore }) => {
	return {

		store: {
			token: localStorage.getItem("token") || "",
			// Cambiar la urlBase segun se necesite
			// urlBase: "http://127.0.0.1:5000",
			urlBase: "https://5000-migueamaro-buzzrapi-j8t84hfnf2v.ws-us46.gitpod.io",
			userId: localStorage.getItem("id") || "",
			userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
			messages: JSON.parse(localStorage.getItem("messages")) || []

		},

		actions: {

			handleLogin: async (login) => {
				const store = getStore();
				const actions = getActions();
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
							token: data.token,
							userId: data.user_id
						})
						localStorage.setItem("token", data.token)
						localStorage.setItem("id", data.user_id)
						actions.handleMessages()
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
					token: "",
					id: ""
				})
				localStorage.removeItem("token")
				localStorage.removeItem("id")
				localStorage.removeItem("userInfo")
				localStorage.removeItem("messages")
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
					let response = await fetch(`${store.urlBase}/user/${store.userId}`, {
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
							userInfo: data
						})
						localStorage.setItem("userInfo", JSON.stringify(store.userInfo))
					}
				}
				catch (error) {
					console.log(error)
				}
			},

			handleEdit: async (info) =>{
				let store = getStore();
				try{
					let response = await fetch(`${store.urlBase}/user/${store.userId}`, {
						method: 'PUT',
						body: JSON.stringify(info),
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						}
					})
					if(response.ok){
						let data = await response.json()
						setStore({
							...store,
							userInfo: data
						})
					}
				}catch(error){
					console.log(error)
				}
			},
			handleMessages: async () =>{
				const store = getStore();
				const actions = getActions();
				try{
					let response = await fetch(`${store.urlBase}/messages`, {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						}
					})
					if(response.ok){
						let data = await response.json()
						setStore({
							...store,
							messages: data
						})
						actions.transformDate(store.messages)
					}
				}catch(error){
					console.log(error)
				}
			},
			transformDate: async (messages) => {
				let store = getStore()
				if(store.messages){
					let localDateMessages = [];
					try{
						for (let message of messages){
							let fecha = new Date(message.date)
							let newDate = fecha.toLocaleTimeString();
							message.date = newDate
							localDateMessages.push(message)
						}
						setStore({
							...store,
							messages: localDateMessages
						})
						console.log(store.messages)
						
					}catch(error){
						console.log(error)
					}
				}
			}

			}
		}
	};
export default getState;