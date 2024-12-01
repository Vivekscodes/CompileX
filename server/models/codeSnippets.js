const mongoose = require('mongoose');

const codeSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    codeId:{
        type: String,
        required: true,
        unique: true
    },
    language: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    sourceCode: {
        type: String,
        required: true,
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users', // Reference to the users model
        required: true 
    },
    input: String,
    output: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('CodeSnippets', codeSchema);