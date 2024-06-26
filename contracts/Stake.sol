//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract PanoverseStake is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable {

    IERC20Upgradeable public token1;

    address public admin;

    bool public forfeitable;

    struct Stake {
        uint256 txNo;
        uint256 totalAmount;
        mapping(uint256=>UserTransaction) stakingPerTx;
    }

    struct UserTransaction {
        uint256 amount;
        uint256 startTime;
        uint256 totalTime;
        uint16 rewardBasis;
        bool stakingOver;
        bool stakeForfeited;
    }

    mapping(address=>Stake) private stakingTX;
    mapping(uint256=>uint16) private rewardBasis;

    modifier onlyAdmin {
        if(_msgSender()!=admin) {
            revert NotAdmin();
        }
        _;
    }

    error NotAdmin();
    error NullAmount();
    error NullTime();
    error InvalidBasis();
    error StakeOver();
    error StakeNotOver();
    error StakeForfeited();
    error ForfeitForbidden();

    event StakeDeposit(
        uint256 _txNo,
        uint256 _amount,
        uint16 _rewardBasis,
        uint256 _startTime,
        uint256 _totalTime
    );

    event StakeForfeit(
        uint256 _txNo,
        uint256 _amount
    );


    function init(address _admin, IERC20Upgradeable _token) external initializer() {
        admin = _admin;
        token1 = _token;
        __Ownable_init();
        __ReentrancyGuard_init();
    }

    function stake(uint256 _time, uint256 _amount) external nonReentrant() {
        Stake storage stake = stakingTX[_msgSender()];
        if(_amount == 0) {
            revert NullAmount();
        }
        if(_time == 0) {
            revert NullTime();
        }
        if(rewardBasis[_time]==0) {
            revert InvalidBasis();
        }
        bool success = _addStake(_amount, _time);
        if(success) {
            emit StakeDeposit(stake.txNo,_amount,rewardBasis[_time],block.timestamp,_time);
        }
    }

    function forfeitStake(uint256 _txNo) external nonReentrant() {
        if(!forfeitable) {
            revert ForfeitForbidden();
        }
        Stake storage stake = stakingTX[_msgSender()];
        if(stake.stakingPerTx[_txNo].stakingOver) {
            revert StakeOver();
        }
        if(stake.stakingPerTx[_txNo].stakeForfeited) {
            revert StakeForfeited();
        }
        uint amount = stake.stakingPerTx[_txNo].amount;
        stake.totalAmount-=amount;
        stake.stakingPerTx[_txNo].amount = 0;
        stake.stakingPerTx[_txNo].stakeForfeited = true;
        token1.transfer(_msgSender(),amount);
        emit StakeForfeit(_txNo, amount);   
    }

    function withdrawStake(uint256 _txNo) external nonReentrant() {
        Stake storage stake = stakingTX[_msgSender()];
        if(!stake.stakingPerTx[_txNo].stakingOver) {
            revert StakeNotOver();
        }
        uint amount = stake.stakingPerTx[_txNo].amount;
        stake.totalAmount-=amount;
        stake.stakingPerTx[_txNo].amount = 0;
    }

    function _addStake(uint256 _amount, uint256 _time) internal returns(bool){
        Stake storage stake = stakingTX[_msgSender()];
        token1.transferFrom(_msgSender(), address(this), _amount);
        stake.txNo++;
        stake.totalAmount+=_amount;
        stake.stakingPerTx[stake.txNo].amount = _amount;
        stake.stakingPerTx[stake.txNo].startTime = block.timestamp;
        stake.stakingPerTx[stake.txNo].totalTime = _time;
        stake.stakingPerTx[stake.txNo].rewardBasis = rewardBasis[_time];
        return true;
    }

    function getStakeDetails(address _user, uint256 _txNo) public view returns(UserTransaction memory) {
        return stakingTX[_user].stakingPerTx[_txNo];
    }

    function changeAdmin(address _admin) external onlyAdmin() {
        admin = _admin;
    }

    function stakeSettings(uint256 _time, uint16 _rewardBasis) external onlyAdmin() {
        rewardBasis[_time] = _rewardBasis;
    }

    function forfeitPermission(bool _permission) external onlyAdmin() {
        forfeitable = _permission;
    }
 
}