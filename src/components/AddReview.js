import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";

const AddReview = () => {
  return (
    <div>
      <Form className="mt-3">
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="review">
          <Form.Label>Location</Form.Label>
          <Form.Control
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
