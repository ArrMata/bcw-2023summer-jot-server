const { PORT } = require('./libraries/Config');
const { info } = require('./libraries/Logger');
const app = require('./server');

app.listen(PORT, () => {
	info(`Server running on port ${PORT}`);
});
