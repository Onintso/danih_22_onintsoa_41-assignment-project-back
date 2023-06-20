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

  function login (req, res){
    User.findOne({ nom: req.body.nom}, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
        
      var passwordIsValid = bcrypt.compareSync(req.body.mdp, user.mdp);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ auth: true, token: token });
    });
  }

  function logout(req, res){
    res.status(200).send({ auth: false, token: null });
  }

  function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
      
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  }

  function getUsersByRole(req, res){
    let userRole = req.params.role;

    User.find({role: userRole}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
  }

  function getUserById(req, res){
    let userId = req.params.id;

    User.findOne({_id: userId}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
}

  module.exports = {registerUser, login, logout, verifyToken, getUsersByRole, getUserById};