const Questions = require('../models/questions')


class Question {
    static List( req, res ){
        Questions.find({})
        .sort({'vote': 'desc'})
        .populate('user')
        // .populate('answers')
        .then( quest =>{
            res.status(201).json(quest)
        })
        .catch( err =>{
            res.status(400).json({msg: err.message})
        })
    }
    static Add( req, res){
        Questions.create({
            title: req.body.title,
            question: req.body.question,
            user: req.user._id
        })
        .then( quest =>{
            res.status(200).json(quest)
        })
        .catch( err =>{
            res.status(400).json({msg: err.message})
        })
    }
    static Search( req, res ){
        Questions.find({
            title: new RegExp(req.query.q, 'i')
        })
        .then ( quest =>{
            res.status(201).json(quest)            
        })
        .catch( err =>{
            res.status(400).json({msg: err.message})
        })
    }

}

module.exports = Question