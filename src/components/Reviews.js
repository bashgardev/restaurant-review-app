import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import StarRating from "./StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const { id } = useParams();
  const { selectedRestaurant } = useContext(RestaurantsContext);
  const [reviews, setReviews] = useState(selectedRestaurant.reviews);

  useEffect(() => {
    // function to fectch data, because async returns a promise in useEffect (cleanup)
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setReviews(response.data.data.reviews);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    console.log("blip");
  }, []);

  console.log(reviews);

  if (reviews === null) {
    console.log("loading");
    return <>Loading...</>;
  } else {
    console.log("finished loading");
    return (
      <Row>
        {reviews &&
          reviews.map((review) => (
            <Col key={review.id} md={4}>
              <Card bg={"warning"} className="mb-4">
                <Card.Header>
                  <Row>
                    <Col>{review.username}</Col>
                    <Col style={{ textAlign: "right" }}>
                      <StarRating rating={review.rating} />
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{review.review}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    );
  }
};

export default Reviews;
