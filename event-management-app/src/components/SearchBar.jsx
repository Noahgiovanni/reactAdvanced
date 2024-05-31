import React, { useState } from "react";
import { Input, Button, Stack } from "@chakra-ui/react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={4}>
      <Input
        placeholder="Search events..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button onClick={handleSearch} colorScheme="blue">
        Search
      </Button>
      <Button onClick={handleClear} colorScheme="gray">
        Clear
      </Button>
    </Stack>
  );
}

export default SearchBar;
