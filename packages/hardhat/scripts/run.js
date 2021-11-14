async function main() {
  const messageContractFactory = await hre.ethers.getContractFactory(
    'MessagePortal'
  );

  const messageContract = await messageContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await messageContract.deployed();

  // Get contract balance.
  let contractBalance = await hre.ethers.provider.getBalance(
    messageContract.address
  );
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  // Send message.
  const messageTxn = await messageContract.send('Hello');
  await messageTxn.wait();

  // Get updated contract balance.
  contractBalance = await hre.ethers.provider.getBalance(
    messageContract.address
  );
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

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
