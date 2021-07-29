import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddReview = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const { addReview } = useContext(RestaurantsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/reviews`, {
        restaurant_id: id,
        username: username,
        review: reviewText,
        rating: rating,
      });
      addReview(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form className="mt-3">
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="review">
          <Form.Label>Review</Form.Label>
          <Form.Control
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            as="textarea"
            rows={3}
            type="text"
            placeholder="Review"
          />
        </Form.Group>

        <Button type="submit" onClick={handleSubmit} variant="primary">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddReview;
