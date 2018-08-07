pragma solidity ^0.4.0;

contract ArtistFactory {
    mapping(address => address) artists; 
    address[] artistList;

    function createArtist(string _name, uint _subscriptionPriceInWei, uint _subscriptionLengthInDays) public {
        if (artists[msg.sender] != address(0)) {
            return;
        }
        
        artists[msg.sender] = new Artist(msg.sender, _name, _subscriptionPriceInWei, _subscriptionLengthInDays);
        artistList.push(msg.sender) -1;
    }
    
    function getArtists() view public returns(address[]) {
        return artistList;
    }
    
    function getArtist(address _address) view public returns (address) {
        return artists[_address];
    }
}

contract Artist {
    address owner;
    address factory;
    string public name;
    uint public subscriptionPriceInWei;
    uint public subscriptionLengthInSeconds;
    string[] ipfsCollections;
    
    mapping(address => uint) subscriptions;
    
    modifier onlyBy(address _account) {
        require(msg.sender == _account);
        _;
    }
    
    constructor(address _owner, string _name, uint _subscriptionPriceInWei, uint _subscriptionLengthInSeconds) public {
        owner = _owner;
        factory = msg.sender;
        name = _name;
        subscriptionPriceInWei = _subscriptionPriceInWei;
        subscriptionLengthInSeconds = _subscriptionLengthInSeconds;
    }
    
    function updateName(string _name) public onlyBy(owner) {
        name = _name;
    }
    
    function updateSubscriptionPrice(uint _subscriptionPriceInWei) public onlyBy(owner) {
        subscriptionPriceInWei = _subscriptionPriceInWei;
    }
    
    function updateSubscriptionLength(uint _subscriptionLengthInSeconds) public onlyBy(owner) {
        subscriptionLengthInSeconds = _subscriptionLengthInSeconds;
    }
    
    function subscribe() public payable {
        require(msg.value == subscriptionPriceInWei);
        
        owner.transfer(msg.value);
        subscriptions[msg.sender] = now;
    }
    
    function getIpfsCollectionCount() public view returns (uint) {
        return ipfsCollections.length;
    }
    
    function getIpfsCollection(uint _index) public view returns (string) {
        return ipfsCollections[_index];
    }
    
    function addIpfsCollection(string _hash) public onlyBy(owner) {
        ipfsCollections.push(_hash);
    }
    
    function removeIpfsCollection(uint _index) public onlyBy(owner) {
        if (_index >= ipfsCollections.length) return;

        for (uint i = _index; i<ipfsCollections.length-1; i++){
            ipfsCollections[i] = ipfsCollections[i+1];
        }
        
        delete ipfsCollections[ipfsCollections.length-1];
        ipfsCollections.length--;
    }
    
    function getUserSubscriptionTimestamp(address _user) public view returns (uint) {
        return subscriptions[_user];
    }
}