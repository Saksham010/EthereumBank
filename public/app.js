const contractABI = [
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contractAddress = "0xEB38E8f5fB00FD3731A4fF0F804A3A9B5401e75E";

document.addEventListener("DOMContentLoaded",async ()=>{
	//Initial dom elements
	const user_address = document.getElementById("address");
	const user_balance = document.getElementById("balance");
	const input = document.getElementById("input");
	const deposit_button = document.getElementById("deposit");
	const withdraw_button = document.getElementById("withdraw");

	//User accounts
	let accounts = [];

  console.log(window.ethereum);

  if(window.ethereum !== undefined){
    console.log("Metamask is installed");

     	accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });
    console.log(accounts);

		//Setting the user user_address
		user_address.innerHTML = accounts[0];

    //Loading Web3 with metamask as provider
    let web3 = new Web3(window.ethereum);
    console.log("web3 is loaded",web3);

    //Instance of smart contract
    const myContract = new web3.eth.Contract(contractABI,contractAddress);
    console.log("Contract is loaded", myContract);


		//Function to query userbalance after connecting
		function getBalance(){

			myContract.methods.getUserBalance().call({from:accounts[0]},function(err,res){

				console.log("UserBalance: ",res);
				const user_balance_ether = web3.utils.fromWei(res,"ether");
				user_balance.innerHTML = user_balance_ether;
			})

		}
		//Querying user_balance
		getBalance();


		//Converting user input value to wei
		let main_value;

		//Deposit
		deposit_button.addEventListener('click',()=>{
			//Converting user input value to wei
			main_value = "0x" + Web3.utils.toBN(Web3.utils.toWei(input.value, "ether")).toString(16)

			myContract.methods.deposit().send({from:accounts[0], value:main_value}, function(err,res){
				console.log(res);
				getBalance();

			})

		});

		//Withdraw
		withdraw_button.addEventListener('click',async()=>{
			//Converting user input value to wei
			main_value = "0x" + Web3.utils.toBN(Web3.utils.toWei(input.value, "ether")).toString(16)

			myContract.methods.withdraw(main_value).send({from:accounts[0]},async function(err,res){
				console.log(res);
				getBalance();
			})

		});

  }

  else{
    alert("Please install Metamask");
  }


});
