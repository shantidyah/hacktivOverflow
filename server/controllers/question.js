const Questions = require('../models/questions')
// const Answers = require('../models/answers')

class Question {
    static List( req, res ){
        Questions.find({})
        .sort({'vote': 'desc'})
        .populate('user')
        .populate('answers')
        .then( quest =>{
            res.status(200).json(quest)
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
            res.status(201).json(quest)
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
            res.status(200).json(quest)            
        })
        .catch( err =>{
            res.status(400).json({msg: err.message})
        })
    }
    static Detail( req, res ){
        Questions.findById(req.params.id)
        .populate('user')
        .populate({
            path: 'answers',
            populate: ({
                path: 'user',
                model: 'User'
            })
        })
        .then( quest =>{
            res.status(200).json(quest)
        })
        .catch( err =>{
            res.status(400).json({msg: err.message})
        })
    }
    static Upvote( req, res){
        Questions.findOne({ // buat ngecek user yang buat article atau tidak
            _id: req.params.id,
            user: req.user.id
        })
        .then( quest =>{
            if(quest){
                console.log(quest);   
                res.status(400).json({msg: "you cant vote your questions"})
            }
            else{
                Questions.findOne({ // buat ngecek udh pernah upvote atau belom
                    _id: req.params.id,
                    upvote: { $in: req.user.id }
                })
                .then( upvote =>{
                    if(upvote){
                        res.status(400).json({msg: "you already vote this questions"})
                    }
                    else{
                        console.log(req.params.id);
                        
                        Questions.findByIdAndUpdate(req.params.id,{ // ngebuang user oid yang ada di downvote
                            $pull: { downvote: req.user.id }
                        })
                        .then( downvote =>{
                            Questions.findByIdAndUpdate(req.params.id,{ // update upvote dan vote -1
                                $push: { upvote: req.user.id },
                                $inc: { vote: 1 }
                            })
                            .then( votes =>{
                                console.log("succes add upvote");
                                res.status(201).json(votes)
                            })
                            .catch( err =>{
                                res.status(400).json({msg: err.message})
                            })
                            // res.status(200).json(downvote)                    
                        })
                        .catch( err => {
                            res.status(400).json({msg: err.message})                    
                        })
                    }
                })
                .catch( err =>{
                    res.status(400).json({msg: err.message})                    
                })
            
            }
        })
        .catch( err =>{
            res.status(400).json({msg: err.message})
        })

    }
    static Downvote( req, res ){
        Questions.findOne({
            _id: req.params.id,
            user: req.user.id 
        })
        .then(quest =>{
            if(quest){
                res.status(400).json({msg: "you cant vote your questions"})
            }
            else{
                Questions.findOne({
                    _id: req.params.id,
                    downvote: { $in: req.user.id }
                })
                .then( downvote =>{
                    if(downvote){
                        res.status(400).json({msg: "you already vote this questions"})
                    }
                    else{
                        Questions.findByIdAndUpdate(req.params.id,{ // ngebuang user oid yang ada di downvote
                            $pull: { upvote: req.user.id }
                        })
                        .then( upvote =>{
                            Questions.findByIdAndUpdate(req.params.id,{ // update upvote dan vote -1
                                $push: { downvote: req.user.id },
                                $inc: { vote: -1 }
                            })
                            .then( votes =>{
                                console.log("berhasil downvote");
                                res.status(200).json(votes)
                            })
                            .catch( err =>{
                                res.status(400).json({msg: err.message})                    
                            })
                        })
                        .catch( err =>[
                            res.status(400).json({msg: err.message})                    
                        ])
                    }
                })
                .catch(err=>{
                    res.status(400).json({msg: err.message})                    
                })
            }
        })
        .catch(err=>{
            res.status(400).json({msg: err.message})
        })
    }
    static DeleteQuest( req, res ){
        Questions.findOneAndRemove({
            _id: req.params.id,
            user: req.user.id
        })
        .then( quest =>{
            if(quest){
                if(quest.answers.length>0){
                    Answers.remove({ question: req.params.id})
                    .then( ans =>{
                        res.status(200).json("success delete a question")
                    })
                    .catch( err =>{
                        res.status(400).json({msg: err.message})
                    })
                }
                else if(quest.answers.length<=0){
                    res.status(200).json("success delete a question")                
                }
            }
            else{
                res.status(400).json({msg: "you dont have an access to delete this question"})
            }
        })
        .catch( err =>{
            res.status(400).json({msg: err.message})
        })
    }
    static Update( req, res ){
        Questions.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id
        },{
            title: req.body.title,
            question: req.body.question
        })
        .then(quest=>{
            if(quest){
                res.status(200).json("berhasil update")
            }
            else{
                res.status(400).json({msg:"you dont have an access to update this question"})
            }
        })
        .catch(err=>{
            res.status(400).json({msg:err.message})
        })
    }
}

module.exports = Question