CREATE TABLE cats (
    ID SERIAL PRIMARY KEY,
    catName VARCHAR(255) NOT NULL,
    catPic TEXT NOT NULL,
    isChonky BOOLEAN NOT NULL
);

INSERT INTO cats (catName, catPic, isChonky) VALUES ('Si', 'https://res.cloudinary.com/sichonky/image/upload/v1591060922/chonky-cats/aqadfh5pksyc2pfzkuvl.jpg', true);