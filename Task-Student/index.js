const express = require('express');
const mainrouter = require('./route')
const app = express();

app.use(express.json());

  app.listen(3000);

app.use('/record',mainrouter);
