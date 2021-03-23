
var nodemailer = require('nodemailer');
const emailConfig = require('../config/email.config');
const requiredFields = [
    "to",
    "subject",
    "text"
];

exports.request = async (req, res) => {

    //create a transporter
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: emailConfig
    });

    //check if the basic mail options are not undefined
    for(field of requiredFields){
        if(req.body[field] === undefined){
            res.send({
                message: `${field} field not provided`
            })
        }
    }

    //set the mail options from the request body
    //check here for the request options: nodemailer.com/message/
    var mailOptions = {
        from: emailConfig.user,
        ... req.body
    }

    //send the email
    await transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send(info);
        }
    });

};
