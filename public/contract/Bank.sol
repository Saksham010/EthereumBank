pragma solidity ^0.8.7;

contract myBank{

    address public owner;
    mapping(address=>uint) private userBalance;

    constructor(){
        owner = msg.sender;
    }

    //Modifier onlyOwner
    modifier onlyOwner(){
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    //Deposit funds into the bank
    function deposit() public payable returns(bool){
        
        require(msg.value >= 0.00001 ether,"The minmum deposit amount is 0.1 ether");
        userBalance[msg.sender] += msg.value;
        return true;

    }

    //Withdraw money from the bank
    function withdraw(uint _amount) public payable returns(bool){

        require(userBalance[msg.sender] >= _amount, "You cannot withdraw more than you deposited");
        userBalance[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        return true;

    }

    //Get balance of the caller in the bank
    function getUserBalance() public returns(uint){
        return userBalance[msg.sender];
    }


    //Get contract balance only availabe to the owner
    function getContractBalance() public onlyOwner returns(uint){
        return address(this).balance;
    }

}
