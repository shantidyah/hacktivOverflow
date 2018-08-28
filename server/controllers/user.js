const jwt = require('jsonwebtoken')
const Users = require('../models/users.js')
const bcrypt = require('bcryptjs')

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
}

module.exports = User