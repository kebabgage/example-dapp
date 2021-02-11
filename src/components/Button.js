import React from 'react';
import styled from 'styled-components'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { useAccount } from '../libs/web3'
import { Button } from 'antd'
import { truncateString } from '../util/helpers'

export default styled(
	({
		className
	}) => {
		const { status, connect, disconnect, address } = useAccount()

		console.log(address);

		return status === 'CONNECTED'
			? 	<Button 
					type='primary'
					className={`account-button -connected ${className}`}
					onClick={disconnect}
					>
					<Jazzicon diameter={20} seed={jsNumberForAddress(address)}/>
					{truncateString(address)}
				</Button>
			: 	<Button 
					type='primary'
					className={`account-button -disconnected ${className}`}
					onClick={connect}
					>
					Connect Wallet
				</Button>
	})
	`
		display: flex;
		align-items: center;
		>.paper{
			margin-right: 0.5em !important;
		}

		color: black;
	`