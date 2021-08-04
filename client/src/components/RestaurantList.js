import React, { useContext, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants, reviews, setReviews } =
    useContext(RestaurantsContext);

  const [reviewCount, setReviewCount] = useState("");

  let history = useHistory();

  // Getting the restaurants from the api
  useEffect(() => {
    // function to fectch data, because async returns a promise in useEffect (cleanup)
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
        setReviews(response.data.data.reviews);
        setReviewCount(response.data.data.review_count);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const calculateReviewAverage = (reviewArray, restaurant_id) => {
    let reviewCount = 0;
    let ratingTotal = 0;
    reviewArray.forEach((review) => {
      if (review.restaurant_id === restaurant_id) {
        reviewCount++;
        ratingTotal = ratingTotal + review.rating;
      }
    });
    if (reviewCount) {
      return ratingTotal / reviewCount;
    } else {
      return reviewCount;
    }
  };

  return (
    <Table hover size="">
      <thead>
        <tr>
          <th>Restaurant</th>
          <th>Location</th>
          <th>Price Range</th>
          <th>Ratings</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {restaurants &&
          reviews &&
          reviewCount &&
          restaurants.map((restaurant) => {
            return (
              <tr
                onClick={() => handleRestaurantSelect(restaurant.id)}
                key={restaurant.id}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>
                  <StarRating
                    rating={calculateReviewAverage(reviews, restaurant.id)}
                  />
                  <>
                    {reviewCount.map((value) => {
                      return value.restaurant_id === restaurant.id
                        ? ` (${value.count})`
                        : "";
                    })}
                  </>
                </td>
                <td>
                  <Button
                    onClick={(e) => handleUpdate(e, restaurant.id)}
                    variant="warning"
                  >
                    Update
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      handleDelete(e, restaurant.id);
                    }}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default RestaurantList;
