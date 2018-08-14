import "./Owned.sol";

contract Mortal is Owned {
    event mortalCalled(string);
    function kill() public {
        emit mortalCalled("mortalCalled");
        if (msg.sender == owner) selfdestruct(owner);
    }
}