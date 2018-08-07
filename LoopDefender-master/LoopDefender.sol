pragma solidity ^0.4.21 ;

contract LoopDefender{

	uint public myNumber = 0;
	mapping (address => uint) public timeCalled;

	function updateNumber () public {
		// Check if the 10 seconds have been passed since the last call of the function.
    	require(timeCalled[msg.sender] + 10 < now);
    	timeCalled[msg.sender] = now;
    	myNumber++;
	}

}
