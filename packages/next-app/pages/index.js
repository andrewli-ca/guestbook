import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { MessageGrid, MessageGridItem } from '../components/MessageGrid';
import { Textarea } from '../components/Textarea';
import styles from '../styles/Home.module.css';
import { useWallet } from '../utils/wallet';
import { format, parseISO } from 'date-fns';

const TWITTER_URL = 'https://twitter.com/andrewli_ca';
const ETHERSCAN_BASE_URL = 'https://rinkeby.etherscan.io/address';
const CONTRACT_ADDRESS = '0x757E343598015cB7265eC8416f6F31FbD8932105';

const data = [
	{
		address: '0xc39Cc76261F0d7AF60b70C4f3DFa9bC50B2bBa54',
		timestamp: '2021-11-13T07:25:12.000Z',
		message: 'Hello world',
	},
	{
		address: '0xc39Cc76261F0d7AF60b70C4f3DFa9bC50B2bBa54',
		timestamp: '2021-11-13T07:26:57.000Z',
		message: 'Test',
	},
	{
		address: '0xc39Cc76261F0d7AF60b70C4f3DFa9bC50B2bBa54',
		timestamp: '2021-11-13T07:26:57.000Z',
		message: 'Labore eiusmod reprehenderit sit ex sit elit ea.',
	},
	{
		address: '0xc39Cc76261F0d7AF60b70C4f3DFa9bC50B2bBa54',
		timestamp: '2021-11-13T07:26:57.000Z',
		message:
			'Elit mollit quis nostrud anim irure est laboris proident reprehenderit dolor amet et.',
	},
];

export default function Home() {
	const { currentAccount, checkIfWalletIsConnected, connectWallet } =
		useWallet();

	const [messageInput, setMessageInput] = useState('');

	useEffect(() => {
		checkIfWalletIsConnected();
	}, [checkIfWalletIsConnected]);

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
						<form className={styles.form}>
							<Textarea
								name="message"
								placeholder={'Enter your message'}
								value={messageInput}
								onChange={(e) => setMessageInput(e.target.value)}
							/>

							<div style={{ marginTop: '32px' }}>
								<Button type="submit">Send message</Button>
							</div>
						</form>
					) : (
						<Button onClick={connectWallet}>Connect to MetaMask</Button>
					)}
				</div>

				<MessageGrid>
					{data?.map(({ message, address, timestamp }) => (
						<MessageGridItem
							key={`${message}-${address}`}
							message={message}
							address={address}
							timestamp={format(parseISO(timestamp), 'Pp')}
						/>
					))}
				</MessageGrid>
			</main>
		</div>
	);
}
