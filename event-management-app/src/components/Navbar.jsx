import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";

function Navbar() {
  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex>
        <Box p="2">
          <Heading size="md" color="white">
            Events App
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: "10px" }}>
            Home
          </Link>
          <Link to="/new-event" style={{ color: "white", textDecoration: "none" }}>
            Add Event
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;
