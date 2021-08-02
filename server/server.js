require("dotenv").config();
const cors = require("cors");
const express = require("express");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    res.status(200).json({
      status: "success",
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// get one restaurant by id
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query("SELECT * FROM restaurants WHERE id=$1", [
      req.params.id,
    ]);

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id=$1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// create restaurants
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(200).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

// create a review for a restaurant
app.post("/api/v1/restaurants/:id/reviews", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO reviews (restaurant_id, username, review, rating) values ($1, $2, $3, $4) RETURNING *",
      [
        req.body.restaurant_id,
        req.body.username,
        req.body.review,
        req.body.rating,
      ]
    );
    res.status(200).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

// update one restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(201).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// delete one restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    console.log(results);
    res.status(204).json({
      status: "success",
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
