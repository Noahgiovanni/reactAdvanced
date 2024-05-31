import React from "react";
import { Select } from "@chakra-ui/react";

function FilterSelect({ categories, onChange }) {
  return (
    <Select
      placeholder="Filter by category"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </Select>
  );
}

export default FilterSelect;
