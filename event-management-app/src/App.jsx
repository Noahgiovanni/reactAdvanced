import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import AddEventPage from "./pages/AddEventPage";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  const handleAddEvent = (newEvent) => {
    console.log("Adding new event:", newEvent);
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route
              path="/new-event"
              element={<AddEventPage onAddEvent={handleAddEvent} />}
            />
          </Routes>
        </ErrorBoundary>
      </Router>
    </ChakraProvider>
  );
}

export default App;
