import "./BabyOwned.sol";

contract Mortal is BabyOwned {
    event mortalCalled(string);
    function kill() public {
        emit mortalCalled("mortalCalled");
        if (msg.sender == owner) selfdestruct(owner);
    }
}