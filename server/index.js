const app = require('./server');

const server = app.listen(process.env.PORT || 8000);
console.log(`server running on port ${server.address().port}`);
