import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Badge,
  Box,
  Button,
  Container,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import { addComment, getComments } from "../actions/posts";

class PostDetail extends Component {
  state = {
    comment: "",
  };

  componentDidMount() {
    this.props.getComments(this.props.location.state.commentUrl);
  }

  showComments = (comments, post) => {
    console.log(comments);
    return (
      <div style={{ padding: "0 5rem", margin: "2rem 0" }}>
        <h1 style={{ marginBottom: "1rem", fontSize: "1.3rem" }}>
          {post.comments} Comments on{" "}
          <span style={{ color: "#9d9d9d" }}>“{post.title}”</span>
        </h1>
        {comments.map((c, index) => (
          <Box borderWidth="1px" key={`${index}${c.id}`} padding="1rem 1.3rem">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={c.user.avatar_url}
                style={{ height: "40px", width: "40px", borderRadius: "50%" }}
              />
              <span style={{marginLeft: '10px'}}>{c.user.login}</span>
              <Badge variant="outline" marginLeft="10px">{c.user.type}</Badge>
            </div>
            <h2
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000000",
                textTransform: "capitalize",
              }}
            >
              {c.name}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: c.body }} style={{marginTop: '15px', marginLeft: '45px'}} />
          </Box>
        ))}
      </div>
    );
  };

  addComment = (commentUrl) => {
    if (this.state.comment !== "") {
      this.props.addComment(commentUrl);
      // Call add Comment action here by passing comment as the body
      console.log(this.state.comment);
    }
  };

  render() {
    const post = this.props.postProps.posts.filter(
      (p) => p.id === this.props.location.state.id
    )[0];
    const { comments } = this.props.postProps;
    return (
      <Container
        maxW="auto"
        style={{
          padding: 0,
          margin: 0,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            background: "rgb(241, 243, 245)",
            padding: "10px 0",
            margin: "10px 0",
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            {post.title}
          </h1>
          <span
            style={{ marginLeft: "10px", color: "#cccccc", fontSize: "30px" }}
          >{`#${post.number}`}</span>
        </header>
        <Box
          bg="rgb(241, 243, 245)"
          w="100%"
          p={4}
          color="white"
          paddingX="2rem"
          width="80%"
          mt="5rem"
        >
          <span
            style={{
              color: "rgba(29, 43, 54, 0.9)",
              fontSize: "20px",
              textTransform: "capitalize",
            }}
          >
            {post.body}
          </span>
        </Box>
        {this.showComments(comments, post)}
        <Box
          borderWidth="1px"
          padding="1rem 1.3rem"
          marginBottom="2rem"
          width="80%"
        >
          <InputGroup size="md">
            <Textarea
              pr="4.5rem"
              placeholder="Add a comment"
              onChange={(e) =>
                this.setState({
                  comment: e.target.value,
                })
              }
            />
          </InputGroup>
          <Button
            colorScheme="blue"
            marginTop="20px"
            onClick={() =>
              this.addComment(this.props.location.state.commentUrl)
            }
          >
            Post
          </Button>
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  postProps: state.postState,
});

export default connect(mapStateToProps, { getComments, addComment })(PostDetail);
