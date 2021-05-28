import React, { Component } from "react";

class Post extends Component {
  state = {
    category: null,
    loading: true,
    post: null,
    replies: [],
  };
  componentDidMount() {
    fetch(
      `http://localhost:3000/replies?postId=${this.props.location.state.post._id}`
    )
      .then((response) => response.json())
      .then((replies) =>
        this.setState({
          category: this.props.location.state.category,
          loading: false,
          post: this.props.location.state.post,
          replies,
        })
      )
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.location.state.post.title}</h1>
        <p>{this.props.location.state.post.content}</p>
        {this.state.loading ? <p>Loading replies...</p> : this.displayReplies()}
      </React.Fragment>
    );
  }
  displayReplies() {
    return (
      <>
        {this.state.replies?.length === 0 ? (
          <p>No response</p>
        ) : (
          this.state.replies?.map((reply) => (
            <>
              <p>{reply.content}</p>
            </>
          ))
        )}
      </>
    );
  }
}

export default Post;
