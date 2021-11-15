# 📕 Guestbook

Guestbook is a site that allows users to send messages and receive some free ETH while they are at it.

This project was created to learn how to write and deploy smart contracts with Solidity. It is based on the _Build a Web3 App With Solidity + Ethereum Smart Contracts_ course from [@\_buildspace](https://twitter.com/_buildspace). This short course is a great way to start learning how to develop smart contracts and I would recommend it to any Web3 newcomers.

![Demo animated gif](https://guestbook-five.vercel.app/screenshot.gif)

## 🖥 Demo

[Link](https://guestbook-five.vercel.app/)

## 🛠 Requirements

- pnpm
- MetaMask
- Node 16.13.0

## 🔧 Setup

In the root directory, install the packages.

```shell
pnpm install
```

Change directory to the hardhat package.

```shell
cd packages/hardhat
```

Start a local Ethereum network. You will be given 20 accounts with a balance of 10000 ETH each to work with.

```shell

pnpm exec hardhat node
```

Setup MetaMask wallet for localhost using one of the 20 accounts. More information to set up MetaMask can be found [here](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account).

In another window, run the deploy script to deploy the contract to the localhost testnet.

```shell
pnpm run deploy:local
```

If the smart contract was successfully compiled, the console will output the contract address that was mined to the local hardhat network.

Your console should look something like this:

```shell
Compiling 2 files with 0.8.4
Compilation finished successfully
MessagePortal address:  0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Copy the `.env.example` file located in `packages/next-app` to `.env.local`. Paste the contract address for the `NEXT_PUBLIC_CONTRACT_ADDRESS` key. This tells the React app where the contract can be found for the app to make interactions with.

In addition for the App to interact with the contract, it needs an artifact file. Head to `packages/hardhat/artifacts/contracts/MessagePortal.json`. Copy this file over to `packages/next-app/utils/MessagePortal.json`.

Note each time the contract has been modified and is deployed, a new artifact file is generated and will need to be copied over to the `next-app` package folder.

Now we are ready to run the app. Open a new window and cd to `packages/next-app`. Start the Next.js server.

```shell
pnpm run dev
```

View the app at:

```shell
http://localhost:3000
```

Connect the wallet you set up earlier. Make sure to switch to the `Localhost 8545` network.

## ☁️ Deployment

Deploying to the Ethereum Mainnet costs real money. As an alternative, we will be deploying to the Rinkeby Test Network using free ETH (more details below).

Setup the .env file. Rename or copy the `packages/hardhat/.env.example` to `packages/hardhat/.env`.

Sign up for an account [Alchemy](https://alchemy.com). Create a new app and copy the HTTP key. Paste the value for the `STAGING_ALCHEMY_KEY` environment variable.

ETH is required to deploy our smart contract.

To grab some free ETH for the Rinkeby Test Network, the easiest and fastest method is to join the [Buildspace Discord](https://discord.com/invite/vPmqZqgpsS). Head over to the `#faucet-request` channel and use the `/faucet` command.

A good second option is from the [official Rinkeby faucet](https://faucet.rinkeby.io/).

We are almost ready to deploy. We just need to set the private key of your wallet to fund the mining of the contract.

Where to find the Rinkeby private key:

1. Open MetaMask
2. Change the network to Rinkeby Test Network
3. Click the three dots and select Account details
4. Select Export Private Key

Copy the private key. Paste it for the `RINKEBY_PRIVATE_KEY` environment variable.

We are ready to deploy. In the `packages/hardhat` directory, use the command:

```shell
pnpm run deploy:rinkeby
```

Similar to the local deployment process, copy the new contract address and update the environment variable in the Next.js project.

Tip: The contract can be viewed on Etherscan:

```
https://rinkeby.etherscan.io/address/<CONTRACT_ADDRESS>
```

## ⚡️ Other commands

Compile contract:

```shell
pnpm exec hardhat run scripts.run.js
```
