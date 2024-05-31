import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import EventForm from "../components/EventForm";

function AddEventPage({ onAddEvent }) {
  const handleAddEvent = async (newEvent) => {
    try {
      
      const organizerResponse = await fetch("http://localhost:3000/name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newEvent.organizerName }),
      });
      if (!organizerResponse.ok) {
        throw new Error("Failed to add organizer.");
      }
      const organizerData = await organizerResponse.json();

      
      const eventResponse = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newEvent,
          name: organizerData.id, 
        }),
      });
      if (!eventResponse.ok) {
        throw new Error("Failed to add event.");
      }
      const eventData = await eventResponse.json();

      
      onAddEvent(eventData);

    } catch (error) {
      console.error("Error adding event:", error.message);
    }
  };

  return (
    <Box p={4}>
      <Heading>Add New Event</Heading>
      <EventForm onAddEvent={handleAddEvent} />
    </Box>
  );
}

export default AddEventPage;
