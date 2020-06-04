-- Switch to chonky_cats database -> \connect chonky_cats

CREATE TABLE cats (
    ID SERIAL PRIMARY KEY,
    catName VARCHAR(255) NOT NULL,
    catPic TEXT NOT NULL,
    isChonky BOOLEAN NOT NULL
);

-- Si
INSERT INTO cats (catName, catPic, isChonky) VALUES ('Si', 'https://res.cloudinary.com/sichonky/image/upload/v1591060922/chonky-cats/aqadfh5pksyc2pfzkuvl.jpg', true);

-- Helli
INSERT INTO cats (catName, catPic, isChonky) VALUES ('Helli', 'https://res.cloudinary.com/sichonky/image/upload/v1591288913/chonky-cats/IMG-20180622-WA0008_ztrwjk.jpg', true);

-- Orange Tabby
INSERT INTO cats (catName, catPic, isChonky) VALUES ('Orange Cat', 'https://res.cloudinary.com/sichonky/image/upload/v1591288913/chonky-cats/1539613111881_fyis04.jpg', false);

-- Russian Blue
INSERT INTO cats (catName, catPic, isChonky) VALUES ('Russian Blue', 'https://res.cloudinary.com/sichonky/image/upload/v1591288913/chonky-cats/cat_cy0s5e.jpg', false);