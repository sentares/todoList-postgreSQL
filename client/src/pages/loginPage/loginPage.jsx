import styles from './loginPage.module.css';
import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
	return (
		<div className={styles.registerPage}>
			<div className={styles.registerBlock}>
				<Link to='/'>
					<div className={styles.icon}>
						<AiFillHome className={styles.iconPh} />
					</div>
				</Link>
				<form onSubmit={() => {}}>
					<div className={styles.registerInputs}>
						<div className={styles.inputBlock}>
							<input type='text' className={styles.registerInput} placeholder='Ваш email' />
						</div>
						<div className={styles.inputBlock}>
							<input type='text' className={styles.registerInput} placeholder='Ваш пароль' />
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
