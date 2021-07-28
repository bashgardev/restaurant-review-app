import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import StarRating from "./StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

const Reviews = () => {
  const { selectedRestaurant } = useContext(RestaurantsContext);
  const reviews = selectedRestaurant.reviews;
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
