// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title Cauldron
 * @notice LetsCash creator-fee sink for Witchcat ($WITCH) on Robinhood Chain 4663.
 *         harvest() = hook.claim(poolId). ETH stays here. pull() is ops only.
 *
 * @dev Fee recipient on the LetsCash form MUST be an EOA, then
 *      hook.updateCreator(poolId, address(this)). Never put this contract
 *      on the form as creator — the hook will revert NotCreator forever.
 *
 *      Witch Cat game © Satanimax (JS13K), pixel art © Lylouf, MIT.
 *      Token / vault original.
 */
interface ILetscashHook {
    function claim(bytes32 poolId) external;
}

contract Cauldron {
    address public immutable ops;
    address public token;
    address public claimer;
    bytes32 public poolId;

    bool public tokenSet;
    bool public poolSet;
    bool public claimerSet;

    string public constant NAME = "Witchcat";
    string public constant TICKER = "WITCH";
    string public constant WEBSITE = "https://www.witchcat.lol";
    string public constant GITHUB = "https://github.com/witchcatXYZ/witchcat";
    string public constant X = "https://x.com/WitchcatXYZ";
    string public constant LINE = "Every swap feeds the cauldron.";

    error OnlyOps();
    error AlreadySet();
    error ZeroAddress();
    error BadAmount();

    event Harvested(uint256 amount);
    event Pulled(address indexed to, uint256 amount);
    event TokenSet(address token);
    event PoolSet(bytes32 poolId);
    event ClaimerSet(address claimer);

    modifier onlyOps() {
        if (msg.sender != ops) revert OnlyOps();
        _;
    }

    constructor(address ops_) {
        if (ops_ == address(0)) revert ZeroAddress();
        ops = ops_;
    }

    receive() external payable {}

    /// @notice Anyone. Pulls hook pending into this contract. Caller gets no ETH.
    function harvest() external {
        uint256 before = address(this).balance;
        if (claimer != address(0) && poolId != bytes32(0)) {
            ILetscashHook(claimer).claim(poolId);
        }
        emit Harvested(address(this).balance - before);
    }

    /// @notice Ops only. amount is wei, must be <= balance. Do not pass type(uint256).max.
    function pull(address to, uint256 amount) external onlyOps {
        if (to == address(0)) revert ZeroAddress();
        if (amount == 0 || amount > address(this).balance) revert BadAmount();
        (bool ok, ) = payable(to).call{value: amount}("");
        require(ok, "pull");
        emit Pulled(to, amount);
    }

    function setTokenCA(address a) external onlyOps {
        if (tokenSet) revert AlreadySet();
        if (a == address(0)) revert ZeroAddress();
        token = a;
        tokenSet = true;
        emit TokenSet(a);
    }

    function setPoolId(bytes32 id) external onlyOps {
        if (poolSet) revert AlreadySet();
        poolId = id;
        poolSet = true;
        emit PoolSet(id);
    }

    function setClaimer(address a) external onlyOps {
        if (claimerSet) revert AlreadySet();
        if (a == address(0)) revert ZeroAddress();
        claimer = a;
        claimerSet = true;
        emit ClaimerSet(a);
    }

    function socials()
        external
        pure
        returns (
            string memory website,
            string memory github,
            string memory x_,
            string memory line,
            string memory name_
        )
    {
        return (WEBSITE, GITHUB, X, LINE, NAME);
    }
}
