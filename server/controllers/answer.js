const Answers = require('../models/answers')
const Questions = require('../models/questions')

class Answer{
    static List( req, res ){
        Answers.find({})
        .populate('user')
        .then( ans =>{
            res.status(200).json(ans)
        })
        .catch( err =>{
            res.status(400).json({msg: err.message})
        })
    }
    static Add( req, res ){
        console.log(req.params.qid);
        
        Answers.create({
            answer: req.body.answer,
            user: req.user.id,
            question: req.params.qid
        })
        .then( ans =>{
            Questions.findByIdAndUpdate(req.params.qid,{
                $push: { answers: ans._id}
            })
            .then( quest =>{
                res.status(201).json(quest)
            })
            .catch( err =>{
                res.status(400).json({msg: err.message})
            })
        })
        .catch( err =>[
            res.status(400).json({msg: err.message})
        ])
    }
    static Downvote( req, res ){
        Answers.findOne({
            _id: req.params.id,
            user: req.user.id 
        })
        .then(ans =>{
            if(ans){
                res.status(400).json({msg: "you cant vote your answer"})
            }
            else{
                Answers.findOne({
                    downvote: { $in: req.user.id }
                })
                .then( downvote =>{
                    if(downvote){
                        res.status(400).json({msg: "you already vote this answer"})
                    }
                    else{
                        Answers.findByIdAndUpdate(req.params.id,{ // ngebuang user oid yang ada di downvote
                            $pull: { upvote: req.user.id }
                        })
                        .then( upvote =>{
                            Answers.findByIdAndUpdate(req.params.id,{ // update upvote dan vote -1
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
    static Upvote( req, res ){
        Answers.findOne({ // buat ngecek user yang buat article atau tidak
            _id: req.params.id,
            user: req.user.id
        })
        .then( ans =>{
            if(ans){
                console.log(ans);   
                res.status(400).json({msg: "you cant vote your answer"})
            }
            else{
                Answers.findOne({ // buat ngecek udh pernah upvote atau belom
                    upvote: { $in: req.user.id }
                })
                .then( upvote =>{
                    if(upvote){
                        res.status(400).json({msg: "you already vote this answer"})
                    }
                    else{  
                        Answers.findByIdAndUpdate(req.params.id,{ // ngebuang user oid yang ada di downvote
                            $pull: { downvote: req.user.id }
                        })
                        .then( downvote =>{
                            Answers.findByIdAndUpdate(req.params.id,{ // update upvote dan vote -1
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
}

module.exports = Answer