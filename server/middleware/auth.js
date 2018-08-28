var jwt = require('jsonwebtoken')
const Users = require('../models/users.js')

class Auth{
    static Auth(req,res,next){
        // console.log(req.headers.token);
        var decoded = jwt.verify(req.headers.token, process.env.secretKey, function(err,decoded){
            // console.log(decoded);
            if(decoded){
                Users.findOne({
                    email: decoded.email
                })
                .then(user=>{
                    if(user){
                        req.user = user
                        next()
                    }
                    else{
                        res
                        .status(401)
                        .json({
                            msg: "failed authentication"
                        })
                    }
                })
                .catch(err=>{
                    res
                    .status(401)
                    .json({
                        msg: err
                    })
                })
            }
            else{
                res
                .status(401)
                .json({
                    msg: "failed authentication"
                })
            }
        });
    }
}


module.exports = Auth