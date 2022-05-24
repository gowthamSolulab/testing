/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-extraneous-import */
import Web3 from 'web3';
import Web3WsProvider from 'web3-providers-ws';

export default class Web3Socket {
	constructor(providerUrl, options) {
		this.providerUrl = providerUrl;
		this.options = options;

		this.web3Instance = new Web3(new Web3WsProvider(providerUrl, options));
	}

	contract(abi, address) {
		return new this.web3Instance.eth.Contract(abi, address);
	}
}
