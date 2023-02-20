import styles from './registerPage.module.css';
import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
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
							<input type='text' className={styles.registerInput} placeholder='Ваше имя' />
						</div>
						<div className={styles.inputBlock}>
							<input type='text' className={styles.registerInput} placeholder='Ваш email' />
						</div>
						<div className={styles.inputBlock}>
							<input type='text' className={styles.registerInput} placeholder='Ваш пароль' />
						</div>

						<button className={styles.buttonRegister}>Регистрация</button>
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
	);
};
