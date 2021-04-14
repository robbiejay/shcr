const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post(
  '',
  (req,res,next) => {
    console.log('received form');
    console.log(req.body);
    res.status(201).json({
      message: 'Form submitted successfully!'
    })

    let transporter = nodemailer.createTransport({
      service: 'protonmail',
      auth: {
        user: 'info@schrad.io',
        pass: 'livestream888'
      }
    })

    let mailOptions = {
      from: 'info@schrad.io',
      to: 'rj1935@my.bristol.ac.uk',
      subject: 'NEW SUBMISSION from ' + req.body.name,
      text: 'test text'
    }

    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })
  })

module.exports = router;
