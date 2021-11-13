async function main() {
  const messageContractFactory = await hre.ethers.getContractFactory(
    'MessagePortal'
  );

  const messageContract = await messageContractFactory.deploy();
  await messageContract.deployed();

  const messageTxn = await messageContract.send('Hello');
  await messageTxn.wait();

  const messages = await messageContract.getAllMessages();
  console.log(messages);
}

async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();
