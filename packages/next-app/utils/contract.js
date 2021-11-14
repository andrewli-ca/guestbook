import { ethers } from 'ethers';
import MessagePortalAbi from './MessagePortal.json';
import { CONTRACT_ADDRESS } from './constants.js';

async function getAllMessages() {
	try {
		const contract = await getContract();

		return contract.getAllMessages();
	} catch (e) {
		console.log(e);
	}
}

async function sendMessage(message) {
	try {
		const contract = await getContract();

		const messageTxn = await contract.send(message, { gasLimit: 300000 });
		console.log('Mining...', messageTxn.hash);

		await messageTxn.wait();
		console.log('Mined -- ', messageTxn.hash);

		return messageTxn;
	} catch (e) {
		console.log(e);

		// Throw this error so the useAsync hook can catch it and see the status to error.
		throw e;
	}
}

async function getContract() {
	try {
		const { ethereum } = window;

		if (!ethereum) {
			throw new Error(`Ethereum object doesn't exist.`);
		}

		const contractABI = MessagePortalAbi.abi;

		if (!contractABI) {
			throw new Error('No artifact found.');
		}

		const provider = new ethers.providers.Web3Provider(ethereum);
		const signer = provider.getSigner();

		return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
	} catch (e) {
		console.log(e);
	}
}

export { getAllMessages, sendMessage, getContract };
