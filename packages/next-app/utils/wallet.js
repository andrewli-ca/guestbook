import { useState } from 'react';

function useWallet() {
	const [currentAccount, setCurrentAccount] = useState(null);

	async function checkIfWalletIsConnected() {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				throw new Error('No access to ethereum object.');
			}

			/*
			 * Check if we're authorized to access the user's wallet
			 */
			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (!accounts.length) {
				throw new Error('Not authorized');
			}

			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	}

	async function connectWallet() {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				throw new Error('Wallet not found.');
			}

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	}

	return { currentAccount, checkIfWalletIsConnected, connectWallet };
}

export { useWallet };
