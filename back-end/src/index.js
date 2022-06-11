const express = require('express');
require('express-async-errors');
const routes = require('./routes');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:3000');
});
