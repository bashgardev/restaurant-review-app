import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
            placeholder="Restaurant name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Location"
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
        <Button type="submit" onClick={handleSubmit} variant="primary">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddRestaurant;
