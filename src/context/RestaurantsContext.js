import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState("");
  const [reviews, setReviews] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(false);

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurant,
        selectedRestaurant,
        setSelectedRestaurant,
        addReview,
        reviews,
        setReviews,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
