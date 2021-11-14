import { format } from 'date-fns';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { MessageGrid, MessageGridItem } from '../components/MessageGrid';
import { Textarea } from '../components/Textarea';
import styles from '../styles/Home.module.css';
import {
	CONTRACT_ADDRESS,
	ETHERSCAN_BASE_URL,
	TWITTER_URL,
} from '../utils/constants.js';
import { getAllMessages, getContract, sendMessage } from '../utils/contract';
import { useAsync } from '../utils/hooks';
import { useWallet } from '../utils/wallet';

export default function Home() {
	const { run, isLoading } = useAsync();
	const { currentAccount, checkIfWalletIsConnected, connectWallet } =
		useWallet();

	const [messageInput, setMessageInput] = useState('');
	const [allMessages, setAllMessages] = useState([]);

	useEffect(() => {
		checkIfWalletIsConnected()
			.then((wallet) => {
				if (wallet) {
					return getAllMessages();
				}
			})
			.then((results) => {
				const sortByLatest = results.slice().reverse();

				setAllMessages(sortByLatest);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentAccount]);

	useEffect(() => {
		let contract;

		// Listener
		function onNewMessage(from, timestamp, message) {
			// Add new message to the existing messages
			setAllMessages((prevState) => [
				{
					address: from,
					timestamp,
					message: message,
				},
				...prevState,
			]);
		}

		async function effect() {
			contract = await getContract();

			if (contract) {
				// Subscribe to new message event
				contract.on('NewMessage', onNewMessage);
			}
		}

		effect();

		return () => {
			if (contract) {
				// Unsubscribe listener
				contract.off('NewMessage', onNewMessage);
			}
		};
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		return run(sendMessage(messageInput)).then(() => setMessageInput(''));
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div className={styles.header}>
					<span className={styles.logo} aria-label="red book emoji">
						📕
					</span>
					<h1 className={styles.title}>
						<a href={TWITTER_URL} target="_blank" rel="noopener noreferrer">
							andrew&apos;s
						</a>{' '}
						guestbook
					</h1>

					<p className={styles.subtitle}>
						on the{' '}
						<a
							href={`${ETHERSCAN_BASE_URL}/${CONTRACT_ADDRESS}`}
							target="_blank"
							rel="noreferrer"
						>
							Rinkeby Test Network
						</a>
					</p>
				</div>

				<div className={styles.formWrapper}>
					<p className={styles.description}>
						Leave a message, win free ETH!{' '}
						<span aria-label="smiling with sunglasses emoji">😎</span>{' '}
					</p>

					{currentAccount ? (
						<form className={styles.form} onSubmit={handleSubmit}>
							<Textarea
								name="message"
								placeholder={'Enter your message'}
								value={messageInput}
								onChange={(e) => setMessageInput(e.target.value)}
							/>

							<div style={{ marginTop: '32px' }}>
								<Button
									type="submit"
									isLoading={isLoading}
									disabled={!messageInput || messageInput.length > 140}
								>
									Send message
								</Button>
							</div>
						</form>
					) : (
						<div style={{ marginTop: '36px' }}>
							<Button onClick={connectWallet}>Connect to MetaMask</Button>
						</div>
					)}
				</div>

				<MessageGrid>
					{allMessages?.map((message, index) => (
						<MessageGridItem
							key={index}
							message={message.message}
							address={message.visitor}
							timestamp={format(new Date(message.timestamp * 1000), 'Pp')}
						/>
					))}
				</MessageGrid>
			</main>
		</div>
	);
}
