const express = require('express');
const basicAuth = require('basic-auth-connect');
const app = express();

const USERNAME = process.env.USER || 'user';
const PASSWORD = process.env.PASS || 'pass';

app.use(basicAuth(USERNAME, PASSWORD));

app.use(express.static('./dist'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}.`)
});