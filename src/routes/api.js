const express = require('express');
const router = express.Router({});

router.route('/login').get( function(req, res) {
    res.status(200).json("whoeeh")
})

module.exports = router;