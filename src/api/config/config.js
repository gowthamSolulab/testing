import dotenv from 'dotenv';

dotenv.config();

export default {
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
	jetExpiresIn: process.env.JWT_EXPIRES_IN,
	apiVersionUrl: '/api/v1',
	db: {
		str:
			process.env.NODE_ENV === 'production'
				? process.env.CLOUD_MONGO_STRING
				: process.env.CLOUD_MONGO_STRING,
		options: {
			auto_reconnect: true,
			poolSize: 200,
			useNewUrlParser: true,
			readPreference: 'primaryPreferred',
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		},
	},
	alchemyUrl: process.env.ALCHEMY_URL,
	contracts: {
		NFTAddress: process.env.NFT,
		MarketAddress: process.env.MARKET,
		/*

		Contract Details
		
		*/
	},
};
