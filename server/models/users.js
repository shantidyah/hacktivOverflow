const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const bcrypt = require('bcryptjs')

const uniqueValidator = require('mongoose-unique-validator')


const schemaUser = new Schema({
    name: {
        type: String,
        required: [true, "name cannot empty"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        // unique: [true, "Email already used"],
        validate: {
            validator : function(val) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(val)
            },
            message: result => `${result.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        minlength: [6, "password minimum 6 characters"]
    }
},{
    timestamps: true
})


schemaUser.plugin(uniqueValidator);

// middleware : hash the password before save into db
schemaUser.pre('save', function (next) {
    let user = this;
    //only hash the password if it has been modifed or is new
    if (!user.isModified('password')) return next();

    //generate salt
    bcrypt.hash(user.password, 5, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });

})


const User = mongoose.model('User', schemaUser)

module.exports = User