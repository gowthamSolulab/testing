import sgMail from '@sendgrid/mail';
import logger from './logger.js';

import config from '../config/config.js';

export default sendMail = async (recipient, data) => {
	try {
		logger.info('Inside sendMail helper');
		sgMail.setApiKey(config.sendGrid.apiKey);
		const msg = {
			to: recipient,
			from: config.sendGrid.sender,
			subject: data.subject,
			text: data?.text,
			html: data?.html,
		};
		return await sgMail.send(msg);
	} catch (error) {
		logger.info(error.response.body.errors[0].message);
	}
};
