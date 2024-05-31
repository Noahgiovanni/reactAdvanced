import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, useToast, Button, Spinner } from "@chakra-ui/react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import FilterSelect from "../components/FilterSelect";
import eventData from "../data/events.json";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEvents(eventData.events);
    setFilteredEvents(eventData.events);
    setLoading(false);
  }, []);

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    let filtered = events.filter((event) => {
      if (
        (searchTerm === "" ||
          event.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "" || event.categories.includes(selectedCategory))
      ) {
        return true;
      }
      return false;
    });
    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedCategory]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box p={4}>
      <SearchBar onSearch={handleSearch} />
      <FilterSelect
        categories={eventData.categories}
        onChange={handleFilterChange}
      />
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} names={eventData.name} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default EventsPage;
