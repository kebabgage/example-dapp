import React, { useState, useEffect, Fragment} from 'react';
import styled from 'styled-components'
import { useAccount } from '../libs/web3'
import { Input, Button} from 'antd'
import ERC20 from '../libs/erc20/erc20';
import Web3 from 'web3';
import axios from 'axios';

let styles = {
    'tokensList': {
        'list-style-type': 'none',
        'padding': '0.5px'
    }, 
    'tokenDiv': {
        'display': 'flex', 
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center'
    },
    'liItem': {
        'border':'1px solid blue',
        'padding': '10px',
        'border-radius': '25px',
        'margin': '0 0 10px 0'
    },
    'liItemContainer': {
        'display': 'flex', 
        'flex-direction': 'row', 
        'justify-content': 'space-between'
    }, 
    'tokenName': {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    }, 
    'tokenAddress': {
          'display': 'flex', 
        'align-items': 'start',
        'flex-direction': 'column'
                        
    }


}

const Instructions = styled(({
    className
}) => {
    const { fetchPickleBalance, fetchTokens } = ERC20.useContract();

    const [balanceAddress, setBalanceAddress] = useState('')
    const [tokenAddress, setTokenAddress] = useState('')
    const [balance, setBalance] = useState('?')
    const [tokens, setTokens] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const [tokensFetched, setTokensFetched] = useState(true);


    const handleClick = async (e) => {
        e.preventDefault();
        const balance = await fetchPickleBalance(balanceAddress);

        // Since we dont store decimals on the block chain we use wei to store our values
        // wei is the smallest unit of ethereum.
        // it just adds a bunch of zeros to whatever value is stored (10^-18)
        // fromWei is just a handy util to convert it back to something we understand
        setBalance(Web3.utils.fromWei(balance))
        }


    const handleChange = (e) => {
        e.preventDefault();
        setBalanceAddress(e.target.value);
    }

    const handleGetTokens = (e) => {
        console.log('lelele');
        axios({
                method: 'get',
                url: 'https://web3api.io/api/v1/addresses/' + tokenAddress + '/tokens',
                headers: {
                    'x-api-key': 'UAKcbfc34f15ddca818e0307f28fa509d65'
                }
            }).then(res => 
            {
                console.log(res.data.payload.records);
                // Retrieve the values that we fetched and save them as list values 
                var listItems = res.data.payload.records.map((value) =>
                    value.amount !== '0' && <li style={styles.liItem}>
                    <div style={styles.liItemContainer}>

                        <div style={styles.tokenName}>
                            <p>{value.name}</p>
                        </div>
                        <div style={styles.tokenAddress}>
                            <p>Contract: {value.address}</p>
                            <p>Balance: {Web3.utils.fromWei(value.amount)}</p>
                        </div>
                        
                    </div>
                        
                    </li>);
                
                // Save the tokens 
                setTokens(listItems);

            })
    }

    const handleTokenChange = (e) => {
        e.preventDefault();
        setTokenAddress(e.target.value);
    }



    return (
        <>
            <h1>
                So you're telling me I'm connected to the ethereum blockchain :o
            </h1>
            <h2>Check ./libs/erc20 to see an example of how to interact with smart contracts</h2>

            <p>
                Try enter <a href="https://etherscan.io/address/0x2252A85e520fE2f29E0be62104D8551B32649C66">0xd1dE80930227C56eE8bB2049e4D36bFf4161163E</a> into the field below and hit submit
            </p>

            <div>
                <Input placeholder="Enter in an ethereum address" value={balanceAddress} onChange={handleChange}/>
                <Button onClick={handleClick}>Get Pickle Balance</Button>
            </div>
            
            <h2>Balance: {balance}</h2>

            <div> 
                <Input placeholder="Enter in an ethereum address" value={tokenAddress} onChange={handleTokenChange} />
                <Button onClick={handleGetTokens}>Get owned tokens</Button>
            </div>

            {tokensFetched === true && 
                <div style={styles.tokenDiv}>
                    <h2> Current Tokens </h2>
                    <ul style={styles.tokensList} > {tokens} </ul>
                </div>
            }

        </>
    )
})
``



export default styled(
	({
		className
	}) => {
		const { status } = useAccount()

		return status === 'CONNECTED'
            ? 	<Instructions />
			: <></>
	})
	`
		display: flex;
		align-items: center;
	`