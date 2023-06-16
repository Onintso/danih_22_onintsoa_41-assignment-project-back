var express = require('express');
var bodyParser = require('body-parser');
var User = require('../model/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

  function registerUser(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.mdp, 8);
    
    let user = new User();
    user.nom = req.body.nom,
    user.mdp = hashedPassword
  
    user.save( (err) => {
      if(err){
          res.send('cant post assignment ', err);
      }
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
  })
  }

  module.exports = {registerUser};