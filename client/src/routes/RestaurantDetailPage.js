import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { Container } from "react-bootstrap";
import { useSpring, animated } from "react-spring";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  const animation = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
        // console.log("selected");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // ! intentional
    // eslint-disable-next-line
  }, []);

  return (
    <animated.div style={animation}>
      <Container>
        <h1 className="mb-3 mt-3">
          {selectedRestaurant && selectedRestaurant.restaurant.name}
        </h1>
        <Reviews />
        <AddReview />
      </Container>
    </animated.div>
  );
};

export default RestaurantDetailPage;
