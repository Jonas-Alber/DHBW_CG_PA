var express = require('express');
const path = require('path');
var app = express();
var PORT = 3000;
// With middleware
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));
app.use('/controller/', express.static(path.join(__dirname, 'public/controller')));
app.use('/model/', express.static(path.join(__dirname, 'public/worldControl')));
app.use('/3Dmodels/', express.static(path.join(__dirname, 'public/3Dmodels')));
app.use('/view/', express.static(path.join(__dirname, 'public/view')));
app.use('/sound/', express.static(path.join(__dirname, 'public/sound')));
app.use('/', function(req, res, next){ 
    var options = {
        root: path.join(__dirname)
    };
    var fileName = req.url;
    res.sendFile(fileName, options, function (err) {
        if (err) {
          console.log('Request', req.url);
            console.log('Sent:', fileName);
            next(err);
        } else {
            console.log('Request', req.url);
            console.log('Sent:', fileName);
            next();
        }
    });
});
 
app.get('/', function(req, res){
    console.log("File Sent")
    res.send();
});
 
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on localhost:", PORT);
});
