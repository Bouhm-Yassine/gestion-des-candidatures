const functions = require('firebase-functions');
const admin = require("firebase-admin");
const fs=require('fs'); 
const nodemailer = require('nodemailer');

admin.initializeApp();

const gmailEmail = "z.bouskif@infosat.ma";
const gmailPassword = "Your PassWord";
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const recipent_email = user.email; 
   
    const mailOptions = {
        from: '"STAGIERERH" <yassine.bouhm@edu.uiz.ac.ma>',
        to: recipent_email,
        subject: 'Candidature de stage',
        html:  
        `<p>Bonjour,</p>
        <p>Votre candidature de stage au sein de l'entreprise STAGIERERH a été acceptée.</p>
        <p>Vous pouvez se connecter sur notre platform avec l'identifiant suivant </p>
        <p><strong>Username: </strong>`+recipent_email+`</p>
        <p><strong>Password: </strong>`+recipent_email+`123456</p>
        <p>Cordialement !!</p>
        <p></p>
        <p><strong>STAGIERERH Team</strong></p>`
    };
    
  try {
    mailTransport.sendMail(mailOptions);
    console.log('mail send');
    
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
return null; 
  });