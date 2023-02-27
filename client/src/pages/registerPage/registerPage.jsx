import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './registerPage.module.css'
import { toast } from 'react-toastify'
import { useHttp } from '../../hooks/useHttp.jsx'

export const RegisterPage = () => {
	const navigate = useNavigate()
	const { request, loader } = useHttp()

	const [form, setForm] = useState({
		email: '',
		name: '',
		password: ''
	})

	const handleRegister = async e => {
		e.preventDefault()
		const { name, email, password } = form
		if (name.trim().length && email.trim().length && password.trim().length) {
			const { register, message, type } = await request('/auth/register', 'POST', {
				email: email.trim(),
				password: password.trim(),
				name: name.trim()
			})
			toast[type](message)
			if (register) {
				navigate('/login')
			}
			return
		}
		toast.warn('Заполните пустые поля')
	}

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })

	return (
		<div className={styles.registerPage}>
			<div className={styles.registerBlock}>
				<form onSubmit={handleRegister}>
					<div className={styles.registerInputs}>
						<div className={styles.inputBlock}>
							<input type='text' name='name' className={styles.registerInput} placeholder='Ваше имя' value={form.name} onChange={change} />
						</div>
						<div className={styles.inputBlock}>
							<input type='email' name='email' className={styles.registerInput} placeholder='Ваш email' value={form.email} onChange={change} />
						</div>
						<div className={styles.inputBlock}>
							<input type='password' name='password' className={styles.registerInput} placeholder='Ваш пароль' value={form.password} onChange={change} />
						</div>

						<button className={styles.buttonRegister} onClick={handleRegister}>
							Регистрация
						</button>
						<div className={styles.haveAcc}>
							<p className={styles.acc}>
								Есть аккаунт?
								<Link to='/login' className={styles.signIn}>
									Войти
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
