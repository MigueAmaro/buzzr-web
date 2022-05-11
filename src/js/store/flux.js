const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || ""
		},
		actions: {
			handleLogin: async (login) => {
				const store = getStore();
				try {
					const response = await fetch(`${urlBase}/login`, {
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
			}
		}
	};
};
export default getState;