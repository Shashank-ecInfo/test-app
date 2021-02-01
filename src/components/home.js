import React from "react";
import {
  VStack,
  Box,
  Container,
  Spinner,
  Input,
  InputGroup,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { getPosts } from "../actions/posts";
import moment from "moment";
import { ChatIcon, InfoOutlineIcon } from "@chakra-ui/icons";

class Home extends React.Component {
  state = {
    searchTerm: "",
    filteredPosts: [],
  };

  componentDidMount() {
    this.props.getPosts();
  }

  routeChange = (pid, commentUrl) => {
    this.props.history.push({
      pathname: "/post",
      state: { id: pid, commentUrl: commentUrl },
    });
  };

  showIssues = (posts) => {
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
        console.log(p);
        return (
          <Box
            bgGradient={bgColor[Math.floor(Math.random() * bgColor.length)]}
            key={`${index}${p.id}`}
            pl="20px"
            py="10px"
            onClick={() => this.routeChange(p.id, p.comments_url)}
            cursor="pointer"
            _hover={{ opacity: 0.7 }}
            className="issuesBox"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  color: "#696969"
                }}
                className="issueTitles"
              >
                <InfoOutlineIcon color="darkgreen" marginRight="10px" />
                {p.title}
              </span>
              {p.labels.map((l, index) => (
                <Tooltip
                  key={`${l.node_id}${index}`}
                  label={l.description}
                  aria-label="A tooltip"
                  backgroundColor="#ffffff"
                  color="#000000"
                >
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: `#${l.color}`,
                      color: "#000000",
                      marginLeft: "20px",
                    }}
                  >
                    {l.name}
                  </Badge>
                </Tooltip>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: 20,
              }}
            >
              <div>
                <span style={{ color: "#959da5" }}>{`#${p.number}`}</span>
                <span style={{ color: "#959da5", marginLeft: 10 }}>{`${moment(
                  p.created_at
                )
                  .startOf("day")
                  .fromNow()} by ${p.user.login.replace("-", " ")}`}</span>
              </div>
              <span>
                {p.comments === 0 ? null : (
                  <span>
                    <ChatIcon marginRight="10px" />
                    {p.comments}
                  </span>
                )}
              </span>
            </div>
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
            Issues
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
            {this.showIssues(posts)}
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
