import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './loginPage.module.css';

export const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {};

	const changeEmail = e => {
		setEmail(e.target.value);
	};

	const changePassword = e => {
		setPassword(e.target.value);
	};

	return (
		<div className={styles.registerPage}>
			<div className={styles.registerBlock}>
				{/* <Link to='/'>
					<div className={styles.icon}>
						<AiFillHome className={styles.iconPh} />
					</div>
				</Link> */}
				<form onSubmit={handleLogin}>
					<div className={styles.registerInputs}>
						<div className={styles.inputBlock}>
							<input type='email' className={styles.registerInput} placeholder='Ваш email' value={email} onChange={changeEmail} />
						</div>
						<div className={styles.inputBlock}>
							<input type='password' className={styles.registerInput} placeholder='Ваш пароль' value={password} onChange={changePassword} />
						</div>

						<button className={styles.buttonRegister}>Войти</button>
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
	);
};
