const main = async () => {
  // Compiles the contract and generates artifacts.
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');

  // Deploy the contract. Hardhat creates a single use local Ethereum network.
  // The network gets destroyed after the script completes. Note that deploy()
  // doesn't actually deploy the contract, it makes a request to miners to
  // accept the deployment. In this context, we are mining our own contract.
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });

  // Waits for the contract to be deployed to our local blockchain. Once
  // deployed (when miners are done mining), the contract constructor will run.
  await waveContract.deployed();

  console.log('Contract deployed to:', waveContract.address);

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * This is a request to the blockchain.
   */
  const waveTxn = await waveContract.wave('This is wave #1');
  await waveTxn.wait(); // Wait for transaction to be mined.

  const waveTxn2 = await waveContract.wave('This is wave #2');
  await waveTxn2.wait();

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
