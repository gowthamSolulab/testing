/* eslint-disable node/file-extension-in-import */
/* eslint radix: ["error", "as-needed"] */
/*
	WEB3 helper for NFT and MarketPlace
*/
import { readFileSync } from 'fs';

import config from '../config/config.js';
import logger from './logger.js';
import Web3Socket from '../utils/Web3Socket.js';

const NFT = JSON.parse(readFileSync('./abis/NFT.json'));
const MarketPlace = JSON.parse(readFileSync('./abis/MarketPlace.json'));

// Connect to web3 using Web3Socket class
const web3 = new Web3Socket(config.alchemyUrl, {
	timeout: 30000, // ms

	// Enable auto reconnection
	reconnect: {
		auto: true,
		delay: 5000, // ms
		maxAttempts: 5,
		onTimeout: false,
	},
});

// Create contract instances with contract method from Web3Socket
const NFTInstance = web3.contract(NFT.abi, config.contracts.NFTAddress);

const MarketPlaceInstance = web3.contract(
	MarketPlace.abi,
	config.contracts.MarketAddress
);

// Functions to call Events from contract instance
export const mint = async () =>
	NFTInstance.events.Mint(
		{
			fromBlock: 'latest',
		},
		// eslint-disable-next-line no-unused-vars
		async (error, event) => {
			logger.info('Inside Mint Event');

			/*
				Function Logic 
			*/

			if (error) {
				logger.error('Inside Mint Event');
				logger.error('error', error);
			}
		}
	);

export const sellToken = async () =>
	MarketPlaceInstance.events.PutTokenOnSale(
		{
			fromBlock: 'latest',
		},
		async (error, event) => {
			logger.info('Inside sellToken Event');
			logger.info('event', event);

			/*
				Function Logic 
			*/

			if (error) {
				logger.error('Inside sellToken Event');
				logger.error('error', error);
			}
		}
	);

export const makeBid = async () =>
	MarketPlaceInstance.events.MakeBid(
		{
			fromBlock: 'latest',
		},
		async (error, event) => {
			logger.info('Inside MakeBid Event');
			logger.info('event', event);

			/*
				Function Logic 
			*/

			if (error) {
				logger.error('Inside MakeBid Event');
				logger.error('error', error);
			}
		}
	);

export const buyToken = async () =>
	MarketPlaceInstance.events.BuyToken(
		{
			fromBlock: 'latest',
		},
		async (error, event) => {
			logger.info('Inside BuyToken Event');
			logger.info('event', event);

			/*
				Function Logic 
			*/

			if (error) {
				logger.error('Inside BuyToken Event');
				logger.error('error', error);
			}
		}
	);
