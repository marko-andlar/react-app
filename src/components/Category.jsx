import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Category = (props) => {
  return (
    <Link
      to={{
        pathname: "/posts/" + props.category.name,
        state: { category: props.category },
      }}
    >
      <Card bg="dark" text="light" className="m-2">
        <Card.Body>
          <Card.Title>{props.category.name}</Card.Title>
          <Card.Body>Category description</Card.Body>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Category;
