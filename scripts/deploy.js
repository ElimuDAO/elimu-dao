const hre = require("hardhat");

async function main() {
  const Elimu = await hre.ethers.getContractFactory("Elimu");
  const contract = await Elimu.deploy();
  await contract.waitForDeployment();
  console.log("Elimu contract deployed to:", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
