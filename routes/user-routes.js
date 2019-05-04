const express = require('express');
const path = require("path");
const router = express.Router();

router.get('/', (req, res) => {
   const value = req.session.token;
    if (value) {
        res.cookie('token', value);
        console.log(value);
       res.sendFile( path.join(__dirname, '../public/reportdamage.html')); 
    } else {
        res.cookie('token', '')
        console.log('Kaisi hey');
        res.redirect('/');
    }
});


module.exports = router;