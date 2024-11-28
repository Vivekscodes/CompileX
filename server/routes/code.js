const router = require('express').Router();
const code = require('../models/codeSnippets')

router.post('/', async (req, res) => {
    try{
        const snippet = await new code(req.body);
        const savedCode = await snippet.save();
        res.status(201).json(savedCode);
    }  catch(err){
        res.status(500).json(err.message);
    }
})

module.exports = router