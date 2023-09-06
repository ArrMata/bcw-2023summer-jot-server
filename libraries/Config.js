require('dotenv').config();
const { auth } = require('express-oauth2-jwt-bearer');

const {
	PORT,
	TEST_MONGODB_URL,
	NODE_ENV,
} = process.env;

let { MONGODB_URL } = process.env;
MONGODB_URL = NODE_ENV === 'test' ? TEST_MONGODB_URL : MONGODB_URL;

const jwtCheck = auth({
	audience: 'testingapi.nubby',
	issuerBaseURL: 'https://dev-p7vx5zxzsmz52nqh.us.auth0.com/',
	tokenSigningAlg: 'RS256',
});

module.exports = {
	MONGODB_URL,
	PORT,
	NODE_ENV,
	jwtCheck,
};
