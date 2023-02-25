import React from 'react'
import Router from './pages/Router.jsx'
import { ToastContainer } from 'react-toastify'
import { AppContext } from './hooks/Contex.jsx'
import { useHttp } from './hooks/useHttp.jsx'
import { Loader } from './loader/Loader.jsx'

function App() {
	const { request } = useHttp()
	const [isAuth, setIsAuth] = React.useState(false)
	const [loader, setLoader] = React.useState(true)
	const [user, setUser] = React.useState({
		name: '',
		email: '',
		id_user: null
	})

	const checkAuth = async () => {
		const { data, accessToken } = await request('/auth/check')
		if (accessToken.length) {
			setUser(data)
			setIsAuth(true)
		}
		setLoader(false)
	}

	const logout = async () => {
		await request('/auth/logout')
		setUser({
			name: '',
			email: '',
			id_user: null
		})
		setIsAuth(false)
	}

	const getData = data => {
		setUser(data)
		setIsAuth(true)
	}

	React.useEffect(() => {
		checkAuth()
	}, [])

	if (loader) {
		return (
			<>
				<Loader />
			</>
		)
	}

	return (
		<AppContext.Provider value={{ user, getData, logout }}>
			<ToastContainer />
			<div className='App'>
				<Router isAuth={isAuth} />
			</div>
		</AppContext.Provider>
	)
}

export default App
