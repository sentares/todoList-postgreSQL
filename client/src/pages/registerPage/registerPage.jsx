import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './registerPage.module.css'
import { toast } from 'react-toastify'
import { useHttp } from '../../hooks/useHttp.jsx'

export const RegisterPage = () => {
	const navigate = useNavigate()
	const { request, loader } = useHttp()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleRegister = async e => {
		e.preventDefault()
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

	const changeName = e => {
		setName(e.target.value)
	}

	const changeEmail = e => {
		setEmail(e.target.value)
	}

	const changePassword = e => {
		setPassword(e.target.value)
	}
	return (
		<div className={styles.registerPage}>
			<div className={styles.registerBlock}>
				{/* <Link to='/'>
					<div className={styles.icon}>
						<AiFillHome className={styles.iconPh} />
					</div>
				</Link> */}
				<form onSubmit={handleRegister}>
					<div className={styles.registerInputs}>
						<div className={styles.inputBlock}>
							<input type='text' className={styles.registerInput} placeholder='Ваше имя' value={name} onChange={changeName} />
						</div>
						<div className={styles.inputBlock}>
							<input type='email' className={styles.registerInput} placeholder='Ваш email' value={email} onChange={changeEmail} />
						</div>
						<div className={styles.inputBlock}>
							<input type='password' className={styles.registerInput} placeholder='Ваш пароль' value={password} onChange={changePassword} />
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
