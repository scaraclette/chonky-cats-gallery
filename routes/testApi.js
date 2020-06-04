var express = require('express');
var router = express.Router();
const { pool } = require('../config');

/* GET example API */
router.get('/cat', function(req, res) {
    console.log(pool);
    pool.query('SELECT * FROM cats', (error, results) => {
        if (error) {
            throw error;
        } 
        res.status(200).json(results.rows);
    });
});

router.post('/cat', function(req, res) {
    res.send('hey');
});

module.exports = router;