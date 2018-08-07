pragma solidity 0.4.15;
contract HtbMultiSig {
  uint public nonce;                // (only) mutable state
  uint public threshold;            // immutable state
  mapping (address => bool) isOwner; // immutable state
  address[] public ownersArr;        // immutable state

  //HTB MODIFICATION: Destination addresses are hard coded
  address constant destination1=0x2fAc7569d171BE4789b5064dB857e044835ADB33;
  address constant destination2=0x322816D97ac4570Ce20f2F104C82213a44E79c6c;
  //HTB MODIFICATION END

  function HtbMultiSig(uint threshold_, address[] owners_) public {
    require(owners_.length <= 10 && threshold_ <= owners_.length && threshold_ != 0);

    address lastAdd = address(0); 
    for (uint i=0; i<owners_.length; i++) {
      require(owners_[i] > lastAdd);
      isOwner[owners_[i]] = true;
      lastAdd = owners_[i];
    }
    ownersArr = owners_;
    threshold = threshold_;
  }

  // Note that address recovered from signatures must be strictly increasing
  
  //HTB MODIFICATION: No destination or data in arguments 
  function execute(uint8[] sigV, bytes32[] sigR, bytes32[] sigS, uint value) public {
  //HTB MODIFICATION END
  
    require(sigR.length == threshold);
    require(sigR.length == sigS.length && sigR.length == sigV.length);
    //HTB MODIFICATION: First payout is for testing, second payout is for when album is mixed and should be no more than 1/3 of balance 
    if (nonce == 0) {
        require(value < 0.1 ether);
    }
    else if (nonce == 1) {
        require(value <= this.balance/3);
    }
    //HTB MODIFICATION END
    
    // Follows ERC191 signature scheme: https://github.com/ethereum/EIPs/issues/191
    //HTB MODIFICATION: No destination or data in hash
    bytes32 txHash = keccak256(byte(0x19), byte(0), this, value, nonce);
    //HTB MODIFICATION END

    address lastAdd = address(0); // cannot have address(0) as an owner
    for (uint i = 0; i < threshold; i++) {
        address recovered = ecrecover(txHash, sigV[i], sigR[i], sigS[i]);
        require(recovered > lastAdd && isOwner[recovered]);
        lastAdd = recovered;
    }

    // If we make it here all signatures are accounted for
    nonce = nonce + 1;
    
    //HTB MODIFICATION: Payout is split between two hardcoded band member addresses
    require(destination1.call.value(value/2)());
    require(destination2.call.value(value/2)());
    //HTB MODIFICATION END
  }

  function () public payable {}
}

/*
contract Test {
    event Log(bytes32 hash);
    function Test() payable {
    }
    function Go() {
        
        address[] memory owners=new address[](1);
        owners[0]=0xd3f66506b9227344Dc30a56E228f342b646eB61F;
        
        HtbMultiSig w=new HtbMultiSig(1,owners);
        w.transfer(1 ether);
        uint8[] memory sigV=new uint8[](1);
        bytes32[] memory sigR=new bytes32[](1);
        bytes32[] memory sigS=new bytes32[](1);
        sigV[0]=0x1c;
        sigR[0]=0x12520e2c2a42f8ac4bdf22a52198bbc1513a8fb0295ad671e50a2d6722bff9ac;
        sigS[0]=0x72e0ca68693678f460ab58b3d341c670e99e5b694585187c2fc87cc5f72390b4;
        Log(bytes32(address(0x12).balance));
        uint bal=address(0x12).balance;
        w.execute(sigV,sigR,sigS,300);
        require(address(0x12).balance>bal);
        
        address fake_contract=0xce853db3359326dB6D03981C9fb42983BbCdd007;
        Log(keccak256(byte(0x19), byte(0), fake_contract, uint(300), uint(0)));
    }
}*/
