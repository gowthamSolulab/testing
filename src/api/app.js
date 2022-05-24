import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { handleError } from './helpers/responseHandler.js';
import router from './components/index.js';
import config from './config/config.js';
import logger from './helpers/logger.js';

dotenv.config();

const app = express();

if (config.nodeEnv === 'development') {
	app.use(morgan('dev'));
}

// Set Secure HTTP headers
app.use(helmet());

const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use(cors());
app.use(
	express.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		},
	})
);
app.use(express.urlencoded({ extended: false }));
app.use(config.apiVersionUrl, router);
app.get(config.apiVersionUrl, () => {
	logger.info('Response');
});

app.all('*', (req, res, next) => {
	next(
		handleError({
			res,
			statusCode: 404,
			err: `Can't find ${req.originalUrl} on this server!`,
		})
	);
});

export default app;
