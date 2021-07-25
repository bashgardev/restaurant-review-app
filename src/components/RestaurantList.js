import React, { useContext, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useHistory } from "react-router-dom";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  let history = useHistory();

  // Getting the restaurants from the api
  useEffect(() => {
    // function to fectch data, because async returns a promise in useEffect (cleanup)
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
        // console.log(restaurants);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  const handleDelete = async (id) => {
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

  const handleUpdate = (id) => {
    history.push(`/restaurants/${id}/update`);
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
          restaurants.map((restaurant) => {
            return (
              <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>N/A</td>
                <td>
                  <Button
                    onClick={() => handleUpdate(restaurant.id)}
                    variant="warning"
                  >
                    Update
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      handleDelete(restaurant.id);
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
