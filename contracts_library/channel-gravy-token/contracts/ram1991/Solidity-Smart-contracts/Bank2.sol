pragma solidity ^0.4.18;
contract Bank2 {
    address owner;
    uint amount;

    function Bank2() public {
        owner = msg.sender;
        amount = 0;
    }

    function depositAmount() payable returns(uint) {
        if(msg.value >0)
            amount = amount + 1;
        return numberOfTimesAmountDeposited();
    }

    function numberOfTimesAmountDeposited() constant returns (uint) {
        return amount;
    }

    function kill() {
        if(msg.sender == owner)
            selfdestruct(owner); 
    }
}
  
