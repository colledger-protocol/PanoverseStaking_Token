const Hre = require("hardhat");

async function main() {


    // await Hre.run("verify:verify", {
    //   address: "0x21127BD1b19AF8ff7968518Cb69F3BcC688D985d",
    //   contract: "contracts/CarbonExchange.sol:CarbonExchange"
    // });

    await Hre.run("verify:verify", {
      address: "0x60EDD73799BDF327603372E909B2bf9159d681B5",
      contract: "contracts/DNA.sol:ESGNFT"
    });

    // await Hre.run("verify:verify",{
    //   address: "0xeCcD89A66239c4715a5065fad5F141E27638be18",
    //   contract: "contracts/USDT.sol:USDC"
    // });

    // await Hre.run("verify:verify", {
    //   //Deployed contract Factory address0x079D62eaFD6C11020E5a098Ce944f03d7e891041
    //   address: "0xE3384B11FAF5A37A322c52d81d2C29963Dc6C142",
    //   //Path of your main contract.
    //   contract: "contracts/CarbonCredit.sol:ZeroCarbonCredit",
    // });

    // await Hre.run("verify:verify", {
    //   //Deployed contract Marketplace address
    //   address: "0x477663fdbaeac4a862982636aadce355d7485460",
    //   //Path of your main contract.
    //   contract: "contracts/CarbonUnits.sol:ZeroCarbonUnitToken",
    // });

    // await Hre.run("verify:verify", {
    //   //Deployed contract Marketplace address
    //   address: "0x635ee5e9F19b174eFE304ADD2C1FAE764468821d",
    //   //Path of your main contract.
    //   contract: "contracts/Proxy/OwnedUpgradeabilityProxy.sol:OwnedUpgradeabilityProxy",
    // });

    // await Hre.run("verify:verify", {
    //   //Deployed contract Marketplace address
    //   address: "0xb4f0312aC6fc0662090A405b701f71F7D012E769",
    //   //Path of your main contract.
    //   contract: "contracts/ZCUFactory.sol:ZCUFactory",
    // });

    // await Hre.run("verify:verify", {
    //   //Deployed contract Marketplace address
    //   address: "0xE02264d14112E9EeA003dFD22425667dBC078689",
    //   //Path of your main contract.
    //   contract: "contracts/Proxy/OwnedUpgradeabilityProxy.sol:OwnedUpgradeabilityProxy",
    // });

    // await Hre.run("verify:verify", {
    //   //Deployed contract Marketplace address
    //   address: "0x674c9Cc4bc60a8234a8453274Cce1A04dcAB89c8",
    //   //Path of your main contract.
    //   contract: "contracts/Proxy/OwnedUpgradeabilityProxy.sol:OwnedUpgradeabilityProxy",
    // });


}
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});