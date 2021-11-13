import styles from '../styles/MessageGrid.module.css';

function MessageGrid({ children }) {
	return <div className={styles.grid}>{children}</div>;
}

function MessageGridItem({ message, address, timestamp }) {
	return (
		<div key={`${address}-${timestamp}`} className={styles.card}>
			<p className={styles.message}>{message}</p>
			<p className={styles.address}>{address}</p>
			<p className={styles.timestamp}>{timestamp}</p>
		</div>
	);
}

export { MessageGrid, MessageGridItem };
