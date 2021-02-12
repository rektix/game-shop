const cors = require('cors')
const express = require('express');
const games = require('./routes/games');
const history = require('connect-history-api-fallback');
const path = require('path');

const app = express();

app.use(cors())

app.use('/api', games);

const staticMiddleware = express.static(path.join(__dirname, 'dist'));

app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);
console.log("Listening");
app.listen(80);