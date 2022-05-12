const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || "",
			// Cambiar la urlBase segun se necesite
			urlBase: "http://127.0.0.1:5000"
			// urlBase: "https://5000-migueamaro-buzzrapi-i42rbl8mdfv.ws-us44.gitpod.io"
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
				localStorage.removeItem("token")
			},

			checkEmail: (correo) =>{
				let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
				let isOk = expReg.test(correo)
				if(!isOk){
					return false
				}else{
					return true
				}
			}

			}
		}
	};
export default getState;