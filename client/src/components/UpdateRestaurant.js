import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const UpdateRestaurant = () => {
  const { id } = useParams();

  let history = useHistory();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(1);

  useEffect(() => {
    // function to fectch data, because async returns a promise in useEffect (cleanup)
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await RestaurantFinder.put(`/${id}`, {
      name: name,
      location: location,
      price_range: priceRange,
    });
    console.log(response);
    history.push("/");
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price_range">
          <Form.Label>Price Range</Form.Label>
          <Form.Select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </Form.Select>
        </Form.Group>

        <Button onClick={handleSubmit} type="submit" variant="warning">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateRestaurant;
