const express = require('express');
const router =express.Router();
const User= require("../models/User")

// Create a User using : POST "/api/auth".Doesn't requires Auth
router.post('/',(req,res)=>{
    const user =User(req.body);
    user.save();
    console.log(req.body)
    res.send(req.body)
})
module.exports = router;