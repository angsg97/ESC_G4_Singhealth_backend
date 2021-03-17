//pretend like I am a web browser
//technically, this should be using firebase-admin
global.XMLHttpRequest = require('xhr2');

//initialize firebase
var firebase = require('firebase');
require('firebase/storage');
var firebaseConfig = require('../config/firebase.config');
var fbapp = firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
var storageRef = storage.ref();

exports.request = async (req, res) => {

    //check if the file does not exist
    if(req.files === undefined){
        res.status(500).send({
            message: "no image provided"
        });
        return;
    }

    //create the file to upload
    var file = req.files.file;
    var buf = Buffer.from(file.data);
    var metadata = {
        contentType: file.mimetype
    }

    //create an upload url
    var uploadUrl = `${Date.now()}.jpg`;

    try{
        
        //upload the buffer to the storage
        await storageRef.child(uploadUrl).put(buf, metadata).then((snapshot) => {
            console.log("uploaded file");
        });

        //return the response success
        res.send({
            message: "upload success",
            url: `https://firebasestorage.googleapis.com/v0/b/singhealth-retail-management.appspot.com/o/${uploadUrl}?alt=media`
        });
    }
    catch(e){

        //log random errors
        console.log(e);
        res.status(500).send({
            message: "upload fail",
            error: e
        });
    }

};
