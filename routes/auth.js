const express = require('express');
const router =express.Router();
const { body, validationResult } = require('express-validator');
const User= require("../models/User")

// Create a User using : POST "/api/auth".Doesn't requires Auth
router.post('/',[
    body('name','Enter a valid Name').isLength({min: 3 }),
    body('email',"Enter a valid Email").isEmail(),
    body('password',"Enter A valid PassWord").isLength({min: 5}),
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
    }).then(user => res.json(user)).catch(err => {console.log(err)
    res.json({errors:'please enter a unique value for email',message: err.message})})
})
// res.send(req.body)
module.exports = router;