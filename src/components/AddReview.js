import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddReview = () => {
  const [username, setUsername] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);

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

        <Button type="submit" variant="primary">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddReview;
