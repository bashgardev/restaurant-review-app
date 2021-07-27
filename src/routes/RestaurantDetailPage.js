import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { Container } from "react-bootstrap";

const RestaurantDetailPage = (props) => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setSelectedRestaurant, id]);

  return (
    <div>
      <Container>
        <h1>{selectedRestaurant && selectedRestaurant.name}</h1>
        <Reviews />
        <AddReview />
      </Container>
    </div>
  );
};

export default RestaurantDetailPage;
