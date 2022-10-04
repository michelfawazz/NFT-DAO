const { ethers } = require("hardhat");
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
  // verify both contracts
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  //attach
  const deployedfakeNftMarketplace = await FakeNFTMarketplace.attach(
    "0xD8cbce4cE979b87a7CE968681B6a1C11d1F9b6d2"
  );

  
  // Now deploy the CryptoDevsDAO contract
  const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
  
  const deployedcryptoDevsDAO = await CryptoDevsDAO.attach(
    "0xBf79e159405C7d7e95E17fB6743664d6b460cb6C"
  );

  await hre.run("verify:verify", {
    address: deployedcryptoDevsDAO.address,
    constructorArguments: [
      deployedfakeNftMarketplace.address,
      CRYPTODEVS_NFT_CONTRACT_ADDRESS,
      
    ],
  });

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });