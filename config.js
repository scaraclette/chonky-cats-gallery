require('dotenv').config();

const { Pool } = require('pg');
const isProduction = process.env.NODE_ENV === 'production'

var db = process.env.NODE_ENV === "test" ? "chonky_cats_test" : "chonky_cats";

var connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${db}`


const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

console.log(connectionString);

pool.connect();

module.exports = { pool }