import React from "react";
import { Link } from "react-router-dom";
import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";

function EventCard({ event, names }) {
  const getNameById = (id) => {
    const nameObj = names.find((item) => item.id === id);
    return nameObj ? nameObj.name : "Unknown Organizer";
  };

  
  const defaultImageUrl =
    "https://www.barbican.org.uk/sites/default/files/styles/hero_background_super_wide/public/images/2023-04/Small%20group%20doing%20a%20workshop.png?h=c09e71cf&itok=qHANZjkL";

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      m={4}
    >
      <Link to={`/events/${event.id}`}>
        
        <Image
          src={event.image || defaultImageUrl}
          alt={event.title}
          w="100%"
          h="200px"
          objectFit="cover"
        />
      </Link>
      <Box p="6">
        <Heading as="h4" size="md" mb={2} fontWeight="semibold">
          {event.title}
        </Heading>
        <Text color="gray.500" fontSize="sm" mb={2}>
          Location: {event.location}
        </Text>
        <Text color="gray.500" fontSize="sm" mb={2}>
          Organizer: {getNameById(event.name)}
        </Text>
        <Text color="gray.600" fontSize="sm" noOfLines={3}>
          {event.description}
        </Text>
        <Button as={Link} to={`/events/${event.id}`} mt={4} colorScheme="blue">
          View Details
        </Button>
      </Box>
    </Box>
  );
}

export default EventCard;
