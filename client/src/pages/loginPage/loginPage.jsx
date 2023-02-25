import React from 'react'
import { Link } from 'react-router-dom'
import styles from './loginPage.module.css'
import { toast } from 'react-toastify'
import { useHttp } from '../../hooks/useHttp.jsx'
import { AppContext } from '../../hooks/Contex.jsx'

export const LoginPage = () => {
	const { request, loader } = useHttp()
	const { getData } = React.useContext(AppContext)
	const [form, setForm] = React.useState({
		email: '',
		password: ''
	})

	const handleLogin = async e => {
		e.preventDefault()
		const { email, password } = form

		if (email.trim().length && password.trim().length) {
			const { data, accessToken, message, type } = await request('/auth/login', 'POST', { email: email.trim(), password: password.trim() })
			toast[type](message)
			if (accessToken.length) {
				getData(data)
			}
			return
		}
		toast.warn('Заполните пустые поля')
	}

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })

	return (
		<div className={styles.registerPage}>
			<div className={styles.registerBlock}>
				<form>
					<div className={styles.registerInputs}>
						<div className={styles.inputBlock}>
							<input type='email' name='email' className={styles.registerInput} placeholder='Ваш email' value={form.email} onChange={change} />
						</div>
						<div className={styles.inputBlock}>
							<input type='password' className={styles.registerInput} placeholder='Ваш пароль' value={form.password} name='password' onChange={change} />
						</div>

						<button className={styles.buttonRegister} onClick={handleLogin}>
							Войти
						</button>
						<div className={styles.haveAcc}>
							<p className={styles.acc}>
								Нет аккаунта?
								<Link to='/register' className={styles.signIn}>
									Регистрация
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
