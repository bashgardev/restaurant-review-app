import React from "react";
import UpdateRestaurant from "../components/UpdateRestaurant";
import { Container } from "react-bootstrap";

const UpdatePage = () => {
  return (
    <Container>
      <div>
        <h1 className="mb-3 mt-3">Update Restaurant</h1>
        <UpdateRestaurant />
      </div>
    </Container>
  );
};

export default UpdatePage;
