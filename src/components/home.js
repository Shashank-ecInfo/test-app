import React from "react";
import {
  VStack,
  Box,
  Container,
  Spinner,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { getPosts } from "../actions/posts";

class Home extends React.Component {
  state = {
    searchTerm: "",
    filteredPosts: [],
  };

  componentDidMount() {
    this.props.getPosts();
  }

  routeChange = (pid) => {
    this.props.history.push({
      pathname: "/post",
      state: { id: pid },
    });
  };

  showPosts = (posts) => {
    const bgColor = [
      "linear(to-r, green.200, pink.500)",
      "linear(to-l, #7928CA, #FF0080)",
      "linear(to-r,gray.300,yellow.400,pink.200)",
      "linear(red.100 0%, orange.100 25%, yellow.100 50%)",
      "linear(to-t, blue.200, teal.500)",
    ];

    return posts
      .filter((val) => {
        if (this.state.searchTerm === "") {
          return val;
        } else if (
          val.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        ) {
          return val;
        }
      })
      .slice(0, 20)
      .map((p, index) => {
        return (
          <Box
            bgGradient={bgColor[Math.floor(Math.random() * bgColor.length)]}
            key={`${index}${p.id}`}
            alignItems="center"
            display="flex"
            pl="20px"
            py="10px"
            onClick={() => this.routeChange(p.id)}
            cursor="pointer"
            _hover={{ opacity: 0.5 }}
          >
            <span
              style={{
                color: "#696969",
                textTransform: "capitalize",
              }}
            >
              {p.title}
            </span>
          </Box>
        );
      });
  };

  render() {
    const { posts, loading } = this.props.postProps;

    if (loading) {
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner size="xl" color="red.500" />
        </div>
      );
    }

    return (
      <Container maxW="auto">
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            background: "rgb(241, 243, 245)",
            padding: "10px 10px",
            margin: "10px 0",
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              width: "70%",
            }}
          >
            Posts
          </h1>
          <InputGroup size="md" style={{ width: "30%" }}>
            <Input
              pr="4.5rem"
              placeholder="Search..."
              onChange={(e) =>
                this.setState({
                  searchTerm: e.target.value,
                })
              }
            />
          </InputGroup>
        </header>
        <main>
          <VStack spacing={2} align="stretch" justifyContent="center">
            {this.showPosts(posts)}
          </VStack>
        </main>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  postProps: state.postState,
});

export default connect(mapStateToProps, { getPosts })(Home);
