const jwt = require('jsonwebtoken')
const Users = require('../models/users.js')
const bcrypt = require('bcryptjs')
const axios = require('axios')

class User {
    static Register( req, res ){
        Users.findOne({
            email: req.body.email
        })
        .then(user=>{
            if(user){
                res.status(400).json({msg: 'email already used'})
            }
            else{
                Users.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                .then( user =>{
                    var token = jwt.sign({ name: user.name, id: user._id, email: user.email }, process.env.secretKey);
        
                    res.status(201).json(token)
                })
                .catch( err =>{
                    // var split = err.message.split(':')
                    // var errmsg = split[2]
                    res.status(400).json({msg: err.message})
                })
            }
        })
        .catch(err=>{
            res.status(400).json({msg: err.message})
        })
    }
    static Login( req, res ){
        console.log(req.body.email)
        Users.findOne({
            email: req.body.email
        })
        .then( user =>{
            if(user){
                var statusPass = bcrypt.compareSync(req.body.password, user.password)
                if(statusPass){
                    var token = jwt.sign({ name: user.name, id: user._id, email: user.email }, process.env.secretKey);
                    res.status(200).json(token)
                }
                else{
                    res.status(400).json({msg:"your password invalid"})
                }
            }
            else{
                res.status(400).json({msg:"your email invalid"})
            }
        })
        .catch( err =>{
            res.status(401).json({msg:err})
        })
    }
    static Verify( req, res ){
        console.log("masuk sini");
        
        var decoded = jwt.verify( req.headers.token, process.env.secretKey )
   
        Users.findOne({email: decoded.email})
        .then( user =>{
            res.status(200).json(user)
        })
        .catch( err =>{
            res.status(400).json({ msg: err.message })
        })
    }
    static LoginFB( req, res ){
        console.log("fbtoken", req.body.fbToken);
        
        let urlUserInfo = `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.fbToken}`
        axios({
          method: 'POST',
          url: urlUserInfo,
          data:{}
        })
        .then(response => {
            console.log(response.data);
            
            // var salt = bcrypt.genSaltSync(5)
            // var hash = bcrypt.hashSync(response.data.id, salt)
          Users.findOne({email: response.data.email})
          .then(user => {
            //   console.log(user);
              
            if(!user){
            console.log("new user");

              Users.create({
                name: response.data.name,
                email: response.data.email,
                password: response.data.id
              })
              .then(newUser => {
                Users.findOne({email: response.data.email})
                .then(user => {
                  if(user){
                    jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.secretKey, function(err, token) {
                      res.status(201).json({token: token})
                    })
                  } else {
                    res.status(400).json({
                      message: 'Email not found!'
                    })
                  }
                })
                .catch(err => {
                  res.status(400).json(err.message)
                })
              })
              .catch(err => {
                res.status(400).json({
                  message: 'Register failed',
                  err
                })
              })
            } else {
                console.log("user lama");
                
              let compare = bcrypt.compareSync(response.data.id, user.password)
              console.log("hasil compare", compare);
              
              if(compare){
                jwt.sign({id: user._id, name: user.name}, process.env.secretKey, (err, token) => {
                  if(err) res.status(401).json('Failed to sign token')
                  res.status(201).json({token: token})
                })
              } else {
                  res.status(401).json({
                    message: 'Login failed, please check your email/password!'
                  })
              }
            }
          })
          .catch(err => {
            res.status(400).json({
                message: 'login with fb error'
            })
          })
        })
        .catch(err => {
            res.status(400).json({
                message: 'fb error'
            })
        })
    }
}

module.exports = User