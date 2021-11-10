const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  // Compiles the contract and generates artifacts.
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');

  // Deploy the contract. Hardhat creates a single use local Ethereum network.
  // The network gets destroyed after the script completes. Note that deploy()
  // doesn't actually deploy the contract, it makes a request to miners to
  // accept the deployment. In this context, we are mining our own contract.
  const waveContract = await waveContractFactory.deploy();

  // Waits for the contract to be deployed to our local blockchain. Once
  // deployed (when miners are done mining), the contract constructor will run.
  await waveContract.deployed();

  console.log('Contract deployed to:', waveContract.address);
  console.log('Contract deployed by:', owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  // This is a request to the blockchain.
  let waveTxn = await waveContract.wave();

  // Wait for miners to finish mining the transaction.
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
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
