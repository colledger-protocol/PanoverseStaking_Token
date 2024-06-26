//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract PanoverseRewards is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable {

    IERC20Upgradeable public token2;

    address public admin;

    uint16 basisPoints = 10000;

    struct Stake {
        uint256 amount;
        uint256 rewardBasis;
        uint256 startTime;
        uint256 totalTime;
        bool isOver;
    }

    mapping(address=> mapping(uint256=>Stake)) public stakeDetails; // User Address ==> Transaction Number ==> Stake Details

    function init(address _admin, IERC20Upgradeable _token) external initializer() {
        admin = _admin;
        token2 = _token;
        __Ownable_init();
        __ReentrancyGuard_init();
    }

    modifier onlyAdmin {
        if(_msgSender()!=admin) {
            revert NotAdmin();
        }
        _;
    }

    error NotAdmin();
    error StakePeriodNotOver();

    event RewardClaimed(uint256 _txNo, uint256 RewardAmount);

    function registerStake(
        address _user,  
        uint256 _txNo, 
        uint256 _amount,
        uint256 _startTime, 
        uint256 _totalTime, 
        uint16 _rewardBasis) 
             public onlyAdmin() {

        Stake storage stake = stakeDetails[_user][_txNo];

            stake.amount = _amount;
            stake.rewardBasis = _rewardBasis;
            stake.startTime = _startTime;
            stake.totalTime = _totalTime;

    }

    function withdrawStake(address _user, uint256 _txNo) public onlyAdmin() {
        Stake storage stake = stakeDetails[_user][_txNo];
        stake.amount = 0;
        stake.isOver = true;
    }

    function checkReward(address _user, uint256 _txNo) public view returns(bool, uint256) {
        Stake storage stake = stakeDetails[_user][_txNo];
            uint256 endTime = stake.startTime + stake.totalTime;
        if(block.timestamp>endTime) {
            uint256 reward = ((stake.amount)*stake.rewardBasis)/basisPoints;
            return(true,reward);
        }
        return(false,0);
    } 

    function getStakeDetails(address _user, uint256 _txNo) public view returns(Stake memory) {
        return stakeDetails[_user][_txNo];
    }

    function claimRewards(uint256 _txNo) external {
        Stake storage stake = stakeDetails[_msgSender()][_txNo];
        uint256 endTime = stake.startTime + stake.totalTime;
        if(block.timestamp<endTime) {
            revert StakePeriodNotOver();
        }
        uint256 reward = ((stake.amount)*stake.rewardBasis)/basisPoints;
        stake.startTime = block.timestamp;
        IERC20Upgradeable(token2).transfer(_msgSender(), reward);
        emit RewardClaimed(_txNo, reward);
    }

    function changeAdmin(address _admin) external onlyAdmin() {
        admin = _admin;
    }


}