const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			urlBase: "http://127.0.0.1:5000"
		},
		actions: {
			
			signUp: async (email, password, nombre, apellido, username) => {
				const store = getStore()
				const actions = getActions()
				if(email.trim() == "" || password.trim() == "" || nombre.trim() == "" || apellido.trim() == "" || username.trim() == ""){
					alert('Debe llenar todos los campos')
					console.log("Debe llenar todos los campos")
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
							console.log(response)
						}
						else{
							console.log(response)
						}
					}
					catch(error){
						console.log(error)
					}
				}
			},
		}
	};
};

export default getState;