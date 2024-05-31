import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, Textarea } from "@chakra-ui/react";

function EventForm({ onAddEvent }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [organizerName, setOrganizerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      description,
      categories: [selectedCategory],
      startTime,
      endTime,
      location,
      organizerName,
      image: "https://clevertap.com/wp-content/uploads/2019/08/user-personas-header.jpg?w=1024",
    };
    onAddEvent(newEvent);
    setTitle("");
    setDescription("");
    setSelectedCategory("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    setOrganizerName("");
  };

  return (
    <Box mt={8}>
      <form onSubmit={handleSubmit}>
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input type="text" placeholder="Enter event title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl id="description" mt={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea placeholder="Enter event description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl id="category" mt={4} isRequired>
          <FormLabel>Category</FormLabel>
          <Select placeholder="Select category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="games">Games</option>
            <option value="sports">Sports</option>
            <option value="relaxation">Relaxation</option>
          </Select>
        </FormControl>
        <FormControl id="startTime" mt={4} isRequired>
          <FormLabel>Start Time</FormLabel>
          <Input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </FormControl>
        <FormControl id="endTime" mt={4} isRequired>
          <FormLabel>End Time</FormLabel>
          <Input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </FormControl>
        <FormControl id="location" mt={4} isRequired>
          <FormLabel>Location</FormLabel>
          <Input type="text" placeholder="Enter event location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </FormControl>
        <FormControl id="organizerName" mt={4} isRequired>
          <FormLabel>Organizer Name</FormLabel>
          <Input type="text" placeholder="Enter organizer name" value={organizerName} onChange={(e) => setOrganizerName(e.target.value)} />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Add Event
        </Button>
      </form>
    </Box>
  );
}

export default EventForm;
