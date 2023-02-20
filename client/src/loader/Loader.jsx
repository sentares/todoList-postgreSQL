import styles from './loader.module.css';

export const Loader = () => {
	return (
		<div className={styles.spinnerContainer}>
			<div className={styles.loadingSpinner}></div>
		</div>
	);
};
