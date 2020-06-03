var express = require('express');
var router = express.Router();

// const bodyParser = require('body-parser');
// const cors = require('cors');
const { pool } = require('../config');

/* GET example API */
router.get('/cat', function(req, res) {
    console.log(pool);
    console.log(process.env.NODE_ENV);
    pool.query('SELECT * FROM cats', (error, results) => {
        if (error) {
            throw error;
            // res.status(404).json({'nope':'nothing'});
        } 
        // else {
        //     // console.log(process.env.NODE_ENV);
        //     // console.log('heyyy')
        //     res.status(200).json(results.rows);
        // } 
        res.status(200).json(results.rows);
        pool.end();
    });
});

module.exports = router;