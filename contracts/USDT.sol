//SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDC is ERC20 {
    address public admin;

    constructor() ERC20("USDC", "USDC") {
        _mint(msg.sender, (10 * 10**6) * 10**6);
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender != address(0), "ZA");
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    receive() payable external {

    }
}
