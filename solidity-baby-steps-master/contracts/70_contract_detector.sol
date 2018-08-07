// Given an address hash, detect whether it's a contract-type address or a normal one

/***
 *     _    _  ___  ______ _   _ _____ _   _ _____ 
 *    | |  | |/ _ \ | ___ \ \ | |_   _| \ | |  __ \
 *    | |  | / /_\ \| |_/ /  \| | | | |  \| | |  \/
 *    | |/\| |  _  ||    /| . ` | | | | . ` | | __ 
 *    \  /\  / | | || |\ \| |\  |_| |_| |\  | |_\ \
 *     \/  \/\_| |_/\_| \_\_| \_/\___/\_| \_/\____/
 *                                                 
 *   This contract DOES NOT WORK. It is not currently possible to 
 *   determine whether an address hash is a contract or normal address
 *   from Solidity. - fivedogit 9/14/2015
 *   测试账户是合约账户还是普通账户
 */

contract ContractDetector {

    address creator;
    string contract_or_normal = "not checked";
    
    function ContractDetector() 
    {
        creator = msg.sender;
    }

    //输入目标地址，.call命令 测试目标地址
    function testContractOrNormal(address inc_addr)
    {
    	if(inc_addr.call())
    		contract_or_normal = "normal";
    	else
    		contract_or_normal = "contract";
    }

    //返回目标地址的类型，返回 normal 为普通账户；返回contract 为合约账户
    function getContractOrNormal(address inc_addr) constant returns (string)
    {
    	return contract_or_normal;
    }
    
    /**********
     Standard kill() function to recover funds 
     **********/
    
    function kill()
    { 
        if (msg.sender == creator)
        {
            suicide(creator);  // kills this contract and sends remaining funds back to creator
        }
    }
}