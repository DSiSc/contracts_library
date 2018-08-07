/* 
	The following is an extremely basic example of a solidity contract.
	It takes a string upon creation and then repeats it when greet() is called.
	以下是稳固合同的一个非常基本的例子。
    它在创建时需要一个字符串，然后在调用greet（）时重复它。
*/

contract Greeter         // The contract definition. A constructor of the same name will be automatically called on contract creation. 
                        //合同定义 在创建合同时将自动调用同名的构造函数。

{
    address creator;     // At first, an empty "address"-type variable of the name "creator". Will be set in the constructor.
    //首先，名为“creator”的空“地址”类型变量。 将在构造函数中设置。
    string greeting;     // At first, an empty "string"-type variable of the name "greeting". Will be set in constructor and can be changed.
    //首先，名为“greeting”的空“string”类型变量。 将在构造函数中设置并可以更改。
    function Greeter(string _greeting) public   // The constructor. It accepts a string input and saves it to the contract's "greeting" variable.
    {//构造函数 它接受一个字符串输入并将其保存到合约的“greeting”变量中
        creator = msg.sender;
        greeting = _greeting;
    }

    function greet() constant returns (string)          
    {
        return greeting;
    }
    
    function getBlockNumber() constant returns (uint) // this doesn't have anything to do with the act of greeting
    {													// just demonstrating return of some global variable
        //这与问候行为没有任何关系，只是展示了一些全局变量的返回
        return block.number;
    }
    
    function setGreeting(string _newgreeting) 
    {
        greeting = _newgreeting;
    }
    
     /**********
     Standard kill() function to recover funds 
     **********/
    
    function kill()
    { 
        if (msg.sender == creator)  // only allow this action if the account sending the signal is the creator
            suicide(creator);       // kills this contract and sends remaining funds back to creator
        //如果发送信号的帐户是创建者杀死此合同并将剩余资金发回给创建者，则仅允许此操作
    }

}
