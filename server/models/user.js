const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    codes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CodeSnippets' // Reference to the CodeSnippets model
        }
    ]
})

module.exports = mongoose.model('users', userSchema)