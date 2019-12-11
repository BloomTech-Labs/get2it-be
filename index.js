const server = require('./server.js');
require("dotenv").config();

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));