--Contains SQL commands for building de database in POSTGRESQL

DROP TABLE restaurants;

CREATE TABLE restaurants(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL CHECK (price_range >= 1 AND price_range <=5)
);

CREATE TABLE reviews(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  username VARCHAR(50) NOT NULL,
  review VARCHAR(300) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <=5)
);



INSERT INTO restaurants 
  (name, location, price_range) 
values 
  ('Mc''Donald''s', 'New York', 1);

  INSERT INTO restaurants 
  (name, location, price_range) 
values 
  ('Wendy''s', 'Miami', 1);

  INSERT INTO restaurants 
  (name, location, price_range) 
values 
  ('Sushi Sake', 'Doral', 3);



  INSERT INTO reviews (restaurant_id, username, review, rating) values (5, 'maria grazia', 'meh', 1);


UPDATE restaurants SET name = 'Red Lobster', location = 'Ft. Lauderdale', price_range = 2 WHERE id = 5;



