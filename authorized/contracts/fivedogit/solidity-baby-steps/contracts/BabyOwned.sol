contract BabyOwned {
    function BabyOwned() { owner = msg.sender; }
    address owner;
}