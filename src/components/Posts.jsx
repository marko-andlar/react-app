import React, { Component } from "react";
import { Row, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

class Posts extends Component {
  state = {
    category: null,
    loading: true,
    posts: [],
  };
  componentDidMount() {
    const path = this.props.location.state.category
      ? "http://localhost:3000/posts?categoryId=" +
        this.props.location.state.category._id
      : "http://localhost:3000/posts";
    fetch(path)
      .then((response) => response.json())
      .then((posts) =>
        this.setState({
          category: this.props.location.state.category,
          loading: false,
          posts,
        })
      )
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <Row>{this.state.loading ? <p>Loading...</p> : this.displayPosts()}</Row>
    );
  }
  displayPosts() {
    return (
      <>
        <h1>
          {this.state.category ? this.state.category.name : "All categories"}
        </h1>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Post Title</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post._id} onClick={() => this.handleRowClick(post)}>
                <td>{post.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
  handleRowClick = (post) => {
    this.props.history.push({
      pathname: `/posts/${this.state.category.name}/${post.title}`,
      state: { category: this.state.category, post },
    });
  };
}

export default Posts;
