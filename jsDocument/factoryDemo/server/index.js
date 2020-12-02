const path = require('path');
const express = require('express');
const app = express();
app.use('/', express.static(path.resolve(__dirname, '../modules')));
app.listen(3333);