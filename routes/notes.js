const express = require('express');
const router =express.Router();
router.get('/',(req,res)=>{
    obj={
        a:"notes",
        num:890
    }
    res.json(obj)
})
module.exports = router;