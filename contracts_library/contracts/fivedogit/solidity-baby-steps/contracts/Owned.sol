contract Owned {
    address owner;
    function Owned() public { owner = msg.sender; }
}