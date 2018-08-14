pragma solidity ^0.4.0;


contract Findaddress {
    address owner;
    
    function Findaddress() {
        owner = msg.sender;
    }
    
    function getOwnerAddress() public constant returns(address) {
        return owner;
    }
    
     function kill() public {
        if(msg.sender == owner) 
            suicide(msg.sender);
    }
}
