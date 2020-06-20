var express = require('express');
var router = express.Router();
const { pool } = require('../config');

/**
 *  The following route returns all available cats from database
 *  GET /api/cat
 *  status 200
 */
router.get('/cat', function(req, res) {
    // console.log(pool);
    pool.query('SELECT * FROM cats', (error, results) => {
        if (error) {
            throw error;
        } 
        console.log('get /cat: ', results.rows);
        res.status(200).json(results.rows);
    });
});

/**
 *  The following route adds a cat object the database
 *  POST /api/cat
 *  request body {
 *      'catName': <cat's name> <string>,
 *      'catPic': <cloudinary image url> <string>,
 *      'isChonky': <chonky/not> <bool>
 *  }
 *  status 201
 */
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

/**
 *  The following route returns all the chonky cats
 *  GET /api/chonky
 *  response body {
 *      TODO
 *  }
 *  status 200
 */
router.get('/chonky', function(req, res) {
    pool.query('SELECT * FROM cats WHERE ischonky=true', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
});

/**
 *  The following route returns all the non-chonky cats
 *  GET /api/chonky
 *  response body {
 *      TODO
 *  }
 *  status 200
 */
router.get('/not-chonky', function(req, res) {
    pool.query('SELECT * FROM cats WHERE ischonky=false', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
});

module.exports = router;