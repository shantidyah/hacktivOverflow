const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schemaQuestion = new Schema ({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    answers:[{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    vote: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})


const Question = mongoose.model('Question', schemaQuestion)

module.exports = Question