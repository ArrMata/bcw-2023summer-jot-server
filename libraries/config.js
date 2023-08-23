require('dotenv').config();

const { PORT, MONGODB_URL } = process.env;

module.exports = {
	MONGODB_URL,
	PORT,
};
