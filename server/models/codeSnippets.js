const mongoose = require('mongoose');

const codeSchema = mongoose.Schema({
    language: String,
    version: String,
    sourceCode: String,
    input: String,
    output: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('CodeSnippets', codeSchema);