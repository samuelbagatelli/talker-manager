const express = require('express');
const bodyParser = require('body-parser');
// const { application } = require('express');
const talkerRoutes = require('./routes/talkerRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/talker', talkerRoutes);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = app;
