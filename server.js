const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");

var firebaseConfig = {
    apiKey: "AIzaSyAmB6NpA6m3m-p_qe-h4uuHeaYJRpta1g4",
    authDomain: "fouryearplan-webapp.firebaseapp.com",
    projectId: "fouryearplan-webapp",
    storageBucket: "fouryearplan-webapp.appspot.com",
    messagingSenderId: "132199798821",
    appId: "1:132199798821:web:a157f6282f901ae1ee47cc"
  };
// Initialize Firebase
firebase.initializeApp({ firebaseConfig });



app.use(express.json());
app.use(express.static("express"));
// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/pages/index.html'));
    //__dirname : It will resolve to your project folder.
});
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);