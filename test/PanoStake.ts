import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethers, network } from "hardhat";
import { ING, ING__factory, PanoverseRewards, PanoverseRewards__factory, PanoverseStake, PanoverseStake__factory, USDC, USDC__factory } from "../typechain-types";
import { expandTo18Decimals, 
    expandTo6Decimals } from "./utilities/utilities";
import { expect } from "chai";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("Panoverse Stake Test Cases",()=>{

    let owner: SignerWithAddress;
    let signer: SignerWithAddress[];
    let reward: PanoverseRewards;
    let stake: PanoverseStake;
    let usdt: USDC;
    let ing: ING;

    let address1 = "0x0000000000000000000000000000000000000001";
    let address0 = "0x0000000000000000000000000000000000000000"


    beforeEach(async()=>{
        signer = await ethers.getSigners();
        owner = signer[0];
        stake = await new PanoverseStake__factory(owner).deploy();
        reward = await new PanoverseRewards__factory(owner).deploy();
        usdt = await new USDC__factory(owner).deploy();
        ing = await new ING__factory(owner).deploy();
        await stake.connect(owner).init(owner.address, usdt.address);
        await reward.connect(owner).init(owner.address, ing.address);
        await ing.connect(owner).init(owner.address);
        await stake.connect(owner).stakeSettings(300,1000);
        await ing.connect(owner).mint(reward.address,expandTo18Decimals(1000000));
    })

it("TestingStake", async()=>{

    console.log("Balance on USDT " + await usdt.balanceOf(owner.address));
    await usdt.connect(owner).approve(stake.address, expandTo18Decimals(10));
    await stake.connect(owner).stake(300,expandTo6Decimals(1));
    console.log("Stake Details: "+ await stake.getStakeDetails(owner.address,1));    
    const obj = await stake.getStakeDetails(owner.address,1);
    if(obj.rewardBasis>0) {
        await reward.connect(owner).registerStake(owner.address,1,expandTo6Decimals(1),obj.startTime,obj.totalTime,obj.rewardBasis);
    }

    console.log("Stake details on reward contract: "+ await reward.getStakeDetails(owner.address,1));
})

it("Stake Forfeit", async()=>{

    console.log("Balance on USDT " + await usdt.balanceOf(owner.address));
    await usdt.connect(owner).approve(stake.address, expandTo18Decimals(10));
    await stake.connect(owner).stake(300,1000000);
    console.log("Stake Details: ", await stake.getStakeDetails(owner.address,1)); 
    const obj = await stake.getStakeDetails(owner.address,1);
    if(obj.rewardBasis>0) {
        await reward.connect(owner).registerStake(owner.address,1,expandTo6Decimals(1),obj.startTime,obj.totalTime,obj.rewardBasis);
    }
    console.log("Balance on USDT after stake " + await usdt.balanceOf(owner.address));
    await stake.connect(owner).forfeitPermission(true);
    await stake.connect(owner).forfeitStake(1);
    const obj2 = await stake.getStakeDetails(owner.address,1); 
    console.log("Balance on USDT after forfeit: " + await usdt.balanceOf(owner.address));
    if (obj2.stakeForfeited == true) {
        await reward.connect(owner).withdrawStake(owner.address,1);
    }
    console.log("Stake Details after forfeit: " + await stake.getStakeDetails(owner.address,1)); 
    console.log("Stake details on reward contract: "+ await reward.getStakeDetails(owner.address,1));
})

it.only("Claim Rewards", async()=>{

    console.log("Balance on USDT " + await usdt.balanceOf(owner.address));
    await usdt.connect(owner).approve(stake.address, expandTo18Decimals(10));
    await stake.connect(owner).stake(300,expandTo6Decimals(1));
    console.log("Stake Details: "+ await stake.getStakeDetails(owner.address,1));    
    const obj = await stake.getStakeDetails(owner.address,1);
    if(obj.rewardBasis>0) {
        await reward.connect(owner).registerStake(owner.address,1,expandTo6Decimals(1),obj.startTime,obj.totalTime,obj.rewardBasis);
    }

    console.log("Stake details on reward contract: "+ await reward.getStakeDetails(owner.address,1));

    await network.provider.send("evm_increaseTime", [400]);
    await network.provider.send("evm_mine");

    await reward.connect(owner).claimRewards(1);
    console.log("Balance after reward: " + await ing.balanceOf(owner.address));
    
})



})

   