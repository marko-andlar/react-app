import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Category from "./Category";

class Categories extends Component {
  state = {
    loading: true,
    categories: [],
  };
  componentDidMount() {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((categories) => this.setState({ categories, loading: false }))
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <Container>
        <Row className="m-3">
          {this.state.loading ? <p>Loading...</p> : this.displayCategories()}
        </Row>
      </Container>
    );
  }
  displayCategories() {
    return this.state.categories.length === 0 ? (
      <Col md="6">
        <p>No categories to display</p>
      </Col>
    ) : (
      this.state.categories.map((category) => (
        <Col md="6" key={category.name}>
          <Category category={category} />
        </Col>
      ))
    );
  }
}

export default Categories;
