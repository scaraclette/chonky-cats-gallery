var express = require('express');
var router = express.Router();

// const bodyParser = require('body-parser');
// const cors = require('cors');
const { pool } = require('../config');

/* GET example API */
router.get('/cat', function(req, res) {
    pool.query('SELECT * FROM cats', (error, results) => {
        if (error) {
            res.status(404).json({'nope':'nothing'});
        } else {
            res.status(200).json(results.rows);
        } 
    });
});

module.exports = router;