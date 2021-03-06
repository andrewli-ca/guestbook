import { format } from 'date-fns';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { MessageGrid, MessageGridItem } from '../components/MessageGrid';
import { Textarea } from '../components/Textarea';
import styles from '../styles/Home.module.css';
import { ETHERSCAN_BASE_URL, TWITTER_URL } from '../utils/constants.js';
import { getAllMessages, getContract, sendMessage } from '../utils/contract';
import { useAsync } from '../utils/hooks';
import { useWallet } from '../utils/wallet';

export default function Home() {
	const { run, data, error, setError, setData, isLoading } = useAsync();
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
				if (!results) {
					return;
				}

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
			setAllMessages((prevState) =>
				[
					...prevState,
					{
						address: from,
						timestamp,
						message: message,
					},
				]
					.slice()
					.reverse(),
			);
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
		return run(sendMessage(messageInput))
			.then((result) => {
				if (result) {
					confetti({
						particleCount: 150,
						spread: 180,
					});
					setMessageInput('');
				}
			})
			.catch((e) => {});
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>???? Blockchain Guestbook</title>
				<meta
					name="description"
					content="Guestbook app on the Ethereum Rinkeby Testwork."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={styles.header}>
				<a href={TWITTER_URL} target="_blank" rel="noreferrer">
					Twitter
				</a>
				<span style={{ margin: '0 12px' }}></span>
				<a
					href="https://github.com/andrewli-ca/guestbook"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</div>

			<main className={styles.main}>
				<Script
					src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js"
					onLoad={() => {
						let myCanvas = document.createElement('canvas');
						document.body.appendChild(myCanvas);
						confetti.create(myCanvas, {
							resize: true,
							useWorker: true,
						});
					}}
				/>

				<div className={styles.heading}>
					<span className={styles.logo} aria-label="red book emoji">
						????
					</span>
					<h1 className={styles.title}>
						<span href={TWITTER_URL} target="_blank" rel="noopener noreferrer">
							andrew&apos;s
						</span>{' '}
						guestbook
					</h1>

					<p className={styles.subtitle}>
						on the{' '}
						<a
							href={`${ETHERSCAN_BASE_URL}/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`}
							target="_blank"
							rel="noreferrer"
						>
							Rinkeby Test Network
						</a>
					</p>
				</div>

				<div className={styles.formWrapper}>
					<p className={styles.description}>
						Leave a message, get free ETH!{' '}
						<span aria-label="smiling with sunglasses emoji">????</span>{' '}
					</p>

					{currentAccount ? (
						<form className={styles.form} onSubmit={handleSubmit}>
							<Textarea
								name="message"
								placeholder={'Enter your message'}
								value={messageInput}
								disabled={isLoading}
								onChange={(e) => {
									// The first key entered after an error will reset the error so the message dissapears.
									if (error) {
										setError(null);
									}

									// Do the same for the success message.
									if (data) {
										setData(null);
									}

									setMessageInput(e.target.value);
								}}
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

					<div style={{ marginTop: '24px' }}>
						{/* Message sent successfully */}
						{data && !messageInput.length ? (
							<p
								style={{
									marginTop: '24px',
									fontSize: '14px',
									color: '#82AAFF',
								}}
							>
								Thanks for the kind message.{' '}
								<a
									href={`https://rinkeby.etherscan.io/tx/${data.hash}`}
									target="_blank"
									rel="noreferrer"
								>
									0.001 ETH
								</a>{' '}
								has been sent to your wallet.
							</p>
						) : null}

						{/* MetaMask errors */}
						{error?.code && !error.transactionHash && messageInput.length ? (
							<p className={styles.error}>{error.message}</p>
						) : null}

						{/* Transaction error */}
						{error?.transactionHash && messageInput.length ? (
							<p className={styles.error}>
								Error: Unable to complete transaction. View details on{' '}
								<a
									href={`https://rinkeby.etherscan.io/tx/${error.transactionHash}`}
									target="_blank"
									rel="noreferrer"
								>
									Etherscan
								</a>
								.
							</p>
						) : null}
					</div>
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
