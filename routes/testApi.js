var express = require('express');
var router = express.Router();
const { pool } = require('../config');

/* GET example API */
router.get('/cat', function(req, res) {
    // console.log(pool);
    pool.query('SELECT * FROM cats', (error, results) => {
        if (error) {
            throw error;
        } 
        res.status(200).json(results.rows);
    });
});

router.post('/cat', function(req, res) {
    let body = req.body;
    let values = [body['catName'], body['catPic'], body['isChonky']];
    pool.query('INSERT INTO cats (catName, catPic, isChonky) VALUES($1, $2, $3)', values, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201);
    })
});

router.get('/chonky', function(req, res) {
    pool.query('SELECT * FROM cats WHERE ischonky=true', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
});

router.get('/not-chonky', function(req, res) {
    pool.query('SELECT * FROM cats WHERE ischonky=false', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
});

module.exports = router;