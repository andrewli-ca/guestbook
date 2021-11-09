const main = async () => {
  // Compiles the contract and generates artifacts.
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');

  // Deploy the contract. Hardhat creates a single use local Ethereum network.
  // The network gets destroyed after the script completes. Note that deploy()
  // doesn't actually deploy the contract, it makes a request to miners to
  // accept the deployment. In this context, we are mining our own contract.
  const waveContract = await waveContractFactory.deploy();

  // Waits for the contract to be deployed to our local blockchain (when miners
  // are done mining). Once deployed, the contract constructor will run.
  await waveContract.deployed();

  // The address of the deployed contract on the blockchain.
  console.log("Contract deployed to:", waveContract.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();
