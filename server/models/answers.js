const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schemaAnswer = new Schema ({
    answer: {
        type: String,
        required: [true, "Answer is required"]
    },
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