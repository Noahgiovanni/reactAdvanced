import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const toast = useToast();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${id}`);
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
          setEditedEvent({
            title: eventData.title,
            description: eventData.description,
            startTime: new Date(eventData.startTime).toISOString().slice(0, 16),
            endTime: new Date(eventData.endTime).toISOString().slice(0, 16),
          });
        } else {
          throw new Error("Failed to fetch event details.");
        }
      } catch (error) {
        console.error("Error fetching event details:", error.message);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Event deleted successfully");

        setShowDeleteConfirmation(false);

        
        toast({
          title: "Success",
          description: "Event deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        
        window.location.href = "/";
      } else {
        throw new Error("Failed to delete event.");
      }
    } catch (error) {
      console.error("Error deleting event:", error.message);
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to delete event",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEvent),
      });
      if (response.ok) {
        const updatedEvent = await response.json();
        setEvent(updatedEvent);
        setIsEditing(false);
        toast({
          title: "Success",
          description: "Event updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error.message);
      toast({
        title: "Error",
        description: "Failed to update event",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  if (!event) {
    return (
      <Box p={4} textAlign="center">
        <Heading>No event found.</Heading>
      </Box>
    );
  }

  const defaultImageUrl =
    "https://clevertap.com/wp-content/uploads/2019/08/user-personas-header.jpg?w=1024";

  return (
    <Box p={4} maxWidth="400px" mx="auto">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        boxShadow="md"
        borderColor="black"
        bg="gray.100"
        align="baseline"
      >
        <Image
          src={event.image || defaultImageUrl}
          alt={event.title}
          maxH="200px"
          objectFit="cover"
          mb={2}
        />
        <Heading size="md" mt={2} mb={2} noOfLines={2} color="black">
          {event.title}
        </Heading>
        <Text fontSize="sm" color="black" noOfLines={3}>
          {event.description}
        </Text>
        <Text fontSize="sm" color="black" mt={2}>
          Location: {event.location}
        </Text>
        <Text fontSize="sm" color="black">
          Start Time: {new Date(event.startTime).toLocaleString()}
        </Text>
        <Text fontSize="sm" color="black">
          End Time: {new Date(event.endTime).toLocaleString()}
        </Text>
        <Button onClick={handleDeleteConfirmation} mt={4} colorScheme="red">
          Delete
        </Button>
        <Button onClick={handleEdit} mt={4} ml={4}>
          Edit
        </Button>
      </Box>
      <Modal isOpen={isEditing} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                id="title"
                value={editedEvent.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                id="description"
                value={editedEvent.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                id="startTime"
                type="datetime-local"
                value={editedEvent.startTime}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                id="endTime"
                type="datetime-local"
                value={editedEvent.endTime}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={showDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete this event?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default EventDetailsPage;


