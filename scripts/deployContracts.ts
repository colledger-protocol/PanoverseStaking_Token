import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import {
  expandTo18Decimals,
  expandTo6Decimals,
} from "../test/utilities/utilities";
import{PanoverseStake, PanoverseRewards, ING, } from "../typechain-types";

function sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

 const parcel =  { "seller": "0x09750BD8F6cFFA43745ABBB4A910812F0b0dFd16", "tokenId": 1, "maxCarbonUnits": 1000, "pricePerCarbonUnit": 100, "timePeriod": 1692340330, "tokenURI": "Sample", "signature": "0xe0b630746034e23423eba49063b58976e63d9acd9dabeb0c8f676fde6f1d601c5bb3423fbaa1362082b4b0091d9ebc757498fc754cd1ce6bf12e88a91fd3f3ed1b" } 

async function main() {
    const proxy = await ethers.getContractFactory("ESGNFT");
    // const exchange = await ethers.getContractFactory("CarbonExchange");
    // const nft = await ethers.getContractFactory("ZeroCarbonCredit");
    // const token = await ethers.getContractFactory("ZeroCarbonUnitToken");
    // const factory = await ethers.getContractFactory("ZCUFactory");
    // const getPrice = await ethers.getContractFactory("GetPrice");
    // const usdc = await ethers.getContractFactory("USDC");
    // const offset = await ethers.getContractFactory("CarbonOffsetNFT");


    
    // const exchangeAttach = exchange.attach("0x419a129851F7B3659DCd7667F3AE931f0261AD4F");
    // await exchangeAttach.issueNFT(parcel,5,true,"0x6d4B7F81C205F27b25DdDEB737b8d458AF382Ba9",1);
    // console.log("Success");

    // const Getprice = await getPrice.deploy();
    // await sleep(2000);
    // const Usdc = await usdc.deploy();
    // await sleep(2000);

    // const Proxy_Exchange = await proxy.deploy();
    // await sleep(2000);
    // const Proxy_NFT = await proxy.deploy();
    // await sleep(2000);
    // const Exchange = await exchange.deploy();
    // await sleep(2000);
    // const NFT = await nft.deploy();
    // await sleep(2000);
    // const Token = await token.deploy();
    // await sleep(2000);
    const Proxy_Factory = await proxy.deploy();
    await sleep(2000);
    // const Factory = await factory.deploy();
    // await sleep(2000);
    // const Offset = await offset.deploy();
    // await sleep(2000);
    
    // console.log("Get Price-", Getprice.address);
    // console.log("USDT Address-", Usdc.address);
    // console.log("Proxy Exchange-" ,Proxy_Exchange.address);
    // console.log("Exchange Address- ",Exchange.address);
    // console.log("Proxy NFT-", Proxy_NFT.address)
    // console.log("NFT Address- ",NFT.address);
    // console.log("Token Address- "+Token.address);
    console.log("Proxy Factory- "+Proxy_Factory.address);
    // console.log("Factory Address-",Factory.address);
    // console.log("Offset address-", Offset.address);


}  

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
}) ;


// Exchange Address- 0x1f9Abd7c4c8B21c3c1BA09a1aD8e2Fb312Cbc55B
// NFT Address- 0x2f83F3660D0D725b210A73710f7c3af316c6A230
// Token Address- 0x0F191bBc1854Bab6e52e3AfD49c64FE8b7a03410
// Exchange Proxy- 0x419a129851F7B3659DCd7667F3AE931f0261AD4F
// NFT Proxy- 0x3832F99f45979cEDF67603CB4235253E4664C3C3
// Token Proxy- 0x6b27069b128b5Cb3961721767c1B0dC661B776F7

// Exchange Address- 0xAaB08C2Ac1F52D3BAbAA3463F4646E2E94093477
// NFT Address- 0x531D30F4A3E22D804ae4842C6d1EF1430b49e208
// Token Address- 0xF7534AA630f7C49568EF3cbF174d204Df0f68173

//Sepolia

// Exchange Address- 0x069762842049E35E7d4e4CA0Afba75b0FA74Ed5E, 0x927B8f50Ab601D22E67cB443CfaEE36fFB1a43f8
// NFT Address- 0xd19d427f9e7EFfdA18Dc0C5F6EdF7c1687c0b815
// Token Address- 0xA3fa4dCE42cFd5d991c5233B03fECE219F44b6f5
// Exchange Proxy- 0xddce846BA32383428514CBf47583e2946fFB91dC
// NFT Proxy- 0x27597B612F9d421a821E0B83A30d18E4bbe6e3F5
// Token Proxy- 0x0714EA8B98B1a8eE0C261cD9E0B77ac43d799Ea7

// Exchange Address- 0xc61122AB85789927da5a008d6C7AF7c5B7279123
// NFT Address- 0x93A05FE3AB30617F8B543dC84b80676bB3cd07d9
// Token Address- 0xf0126b23283062BbcF58c9317aF7fcF76c3C953a

// Mainnet Addresses - 
// Exchange Proxy- 0xA042B20852f764f4ac8B869b5993C278f5080bb7
// NFT Proxy- 0x39E3E2b493f0C9ACbBD4CAc8d9883681f3DCDD3c
// Token Proxy- 0xD2c22508d92A5260d4C08A70dc3FFd34888b21E8
// Exchange Address- 0xB4c406A6Fe3c0588B3db5d08EE00B844D136dA9a
// NFT Address- 0xafb334A5bB94B30538cFF778baF16d1f8A2E3DAd
// Token Address- 0x5ea7094F7A98Dd6BaCFf54Fc2bD81626e7b34Ff7

//Transaction - 0xc9f8bA3ba59dbF9D07400eBa81E68ce374b009EA
//NFT Address- 0x2755c8456bC82dB20d8FC3edA78DBCfa3806C5F2
//Token Address- 0x95f7bBc8e406faFee6C25921E243561b9163B9ee
//Factory - 0xC67E6BD07cd1f5E877678B3a182d33a1955ef5Cb
//Proxy Address- 0x732B9A80f61ca658e717CF3A3e4d721F8821E304

// Mumbai Testnet - 
// Proxy Exchange- 0xC26736D691Df50f6077Ed1CE48Fdd0f8D532E65B
// Exchange Address-  0x7f0d083945D893eE56F7c3E838F5E4dc83435169
// Proxy NFT- 0xE02264d14112E9EeA003dFD22425667dBC078689
// NFT Address-  0x20212F16f01623E1677d19c2763f03AD049aba78
// Token Address- 0x3807D0976c21d100741e78feBCfFEb9A484f6168
// Proxy Factory- 0x674c9Cc4bc60a8234a8453274Cce1A04dcAB89c8
// Factory Address- 0x54bf0D1DfF535f3FFBd0f7f6E6B5bD7F07CE4ecf
// USDT Address- 0x8A492f0770d317D357d00500BDe9b1C953a19053
// Offset address- 0x71d60f63E31eF82adDDA822A4D7c2a4769fFC5Ed



//// SEPOLIA TEST

// USDT Address- 0xeCcD89A66239c4715a5065fad5F141E27638be18
// Proxy Exchange- 0x635ee5e9F19b174eFE304ADD2C1FAE764468821d
// Exchange Address-  0x74B885b41893Db49757474cb9bB9999009a7229f
// Proxy NFT- 0x9b988fDEb770A05Bdf53098Eb9aDbAB2BDe74237
// NFT Address-  0x567D8f5bb2fc38190e687CFaeA08Cc2787e48f09
// Token Address- 0x3dbdc7f025059B4d6f48A4DF9053296fF733286D
// Proxy Factory- 0x489Bf9bac0ff5651A1bf250A8faE27023971bE08
// Factory Address- 0x2bDB2F48e7bBfEF295af54fA96d64131a045434A
// Offset address- 0xd0Cc6bFAF52c54e950bcE8478B9577dc96b35e04


// MAINNET NEW

// Proxy Exchange - 0x4Eb6fF660dDaE757e466E866dEc29D41a98ED332
// Proxy NFT - 0xe8E1755f2F40d1885356E1A818c969A1e16A7c20
// Exchange - 0x21127bd1b19af8ff7968518cb69f3bcc688d985d
// NFT Address-  0xE3384B11FAF5A37A322c52d81d2C29963Dc6C142
// ZCU - 0x477663FDbaeaC4a862982636aAdCe355d7485460
// Proxy Factory- 0xB906A6E497932052b4f44cfEb22B6E85092Ac816
// Factory Address- 0xb4f0312aC6fc0662090A405b701f71F7D012E769
// Offset Proxy- 0xF69846E814f5d0c5d25B155fE535bF35A0788a8A
// Offset address- 0x6B385E47282f4cE750fE4e02107e86f0A879c285

