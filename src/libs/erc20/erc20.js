import { useEffect, useState, createContext, useContext } from 'react'
import { useNetwork } from '../web3'
import ERC20ABI from './erc20.json';
import axios from 'axios';
import ERC721ABI from './erc20.json';

const Context = createContext({});

const useContract = () => useContext(Context)

const Provider = 
	({
		children
	}) => {

		// Here we use our hooks to get access to some juicy stuff
		let { web3 } = useNetwork()
		let [contract, setContract] = useState()

		// Initialise the contract on component mount
		useEffect(() => {
			if(web3){
				// An ethereum ABI, is simply a JSON representation of the ethereum smart contract
				// It details all the expected usable functions
				// To instantiate a useable contract we parse in the ABI as well as an Ethereum address.
				// This is the address corresponding to the location of the smart contract store on ethereum
				// The example address we gave is to the Pickle token
				const _contract = new web3.eth.Contract(ERC20ABI, '0x429881672B9AE42b8EbA0E26cD9C73711b891Ca5')
				setContract(_contract)
			}
		}, [web3]) // eslint-disable-line


		const fetchPickleBalance = async (address) => {
			return await contract.methods.balanceOf(address).call();
		}

		const fetchTokens = async (address, index) => {

			var result;
			var tokensList = []
			axios({
				method: 'get',
				url: 'https://web3api.io/api/v1/addresses/' + address + '/tokens',
				headers: {
					'x-api-key': 'UAKcbfc34f15ddca818e0307f28fa509d65'
				}
			}).then(res => 
			{

				const vals = res.data.payload.records;
				console.log(vals);
				return vals;
				// console.log(vals[0]);

				// result = new Map(vals.map((val, index) => [index, val]))
				// console.log(result);

				// var i = 0;
				// Object.keys(res.data.payload.records).forEach(function(key) {
				// 	if (res.data.payload.records[key].amount !== "0") {
				// 		tokensList.push(res.data.payload.records[key]);
				// 	}
				// })

				

			})

			return result;
		}

		return <Context.Provider 
			value={{
				// expose more methods here to interact with the contract
				fetchPickleBalance,
				fetchTokens
			}}
			>
			{children}
		</Context.Provider>
	};

export default {
	Provider,
	useContract
}