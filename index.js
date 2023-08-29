const { PORT } = require('./libraries/config');
const { info } = require('./libraries/logger');
const app = require('./server');

app.listen(PORT, () => {
	info(`Server running on port ${PORT}`);
});
