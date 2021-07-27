import React from "react";
import { Container } from "react-bootstrap";
import AddRestaurant from "../components/AddRestaurant";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Container>
        <Header />
        <AddRestaurant />
        <RestaurantList />
      </Container>
    </div>
  );
};

export default Home;
