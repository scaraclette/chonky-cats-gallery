process.env.NODE_ENV = "test";
var { pool } = require("../config");
var request = require("supertest");
var app = require('../app');

// ------------------- DB SETUP ------------------------

// Create table within the database
beforeAll(async() => {
    await pool.query("CREATE TABLE cats (ID SERIAL PRIMARY KEY, catName VARCHAR (255) NOT NULL, catPic TEXT NOT NULL, isChonky BOOLEAN NOT NULL)");
});

// Populate table with 2 cats
beforeEach(async () => {
    // Si and Orange Cat
    await pool.query("INSERT INTO cats (catName, catPic, isChonky) VALUES ('Si', 'https://res.cloudinary.com/sichonky/image/upload/v1591060922/chonky-cats/aqadfh5pksyc2pfzkuvl.jpg', true), ('Orange Cat', 'https://res.cloudinary.com/sichonky/image/upload/v1591288913/chonky-cats/1539613111881_fyis04.jpg', false)");
});

// Delete all cats from table after tests complete
afterEach(async () => {
    await pool.query("DELETE FROM cats");
});

// Delete table from database after tests complete
afterAll(async () => {
    await pool.query("DROP TABLE cats");
    // close database connection
    pool.end();
});

// ------------------- TESTS ------------------------

describe("GET, POST /api/cats", () => {
    // GET
    test("It responds with all available cats", async () => {
        const cats = await request(app)
            .get("/api/cats")

        expect(cats.body).toHaveProperty('catName');
        expect(cats.body).toHaveProperty('catPic');
        expect(cats.body).toHaveProperty('isChonky');
    })
})