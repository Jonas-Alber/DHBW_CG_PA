'use strict';

const express = require('express');
const path = require('path');

// Constants
const PORT = 8080;
const HOST = 'localhost';

// App
const app = express();

app.use(express.static(__dirname + '/public'));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));
app.use('/controller/', express.static(path.join(__dirname, 'public/controller')));
app.use('/model/', express.static(path.join(__dirname, 'public/model')));
app.use('/3Dmodels/', express.static(path.join(__dirname, 'public/3Dmodels')));
app.use('/view/', express.static(path.join(__dirname, 'public/view')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"/public/index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
