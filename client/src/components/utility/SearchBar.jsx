import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import SearchResult from "./SearchResult";
import fetchAPI from "../../api/fetchAPI";

function CommunitySearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchAPI(
          `/communities/search?q=${encodeURIComponent(debouncedSearchTerm)}`
        );
        setSearchResults(data);
      } catch (e) {
        console.error("Failed to fetch search results:", e.errorMessage);
        setError(e.errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
      <TextField
        fullWidth
        label="Search Communities"
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        sx={{
          "& label": { color: "white" },
          "& .MuiInputBase-input": { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
          },
        }}
      />
      {loading && (
        <Typography sx={{ mt: 2, color: "white" }}>Searching...</Typography>
      )}
      {error && <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>}
      {searchResults.length > 0 && (
        <div className="flex flex-row">
          <ul className="w-full p-3 border-x border-b border-gray-400">
            {searchResults.map((community) => (
              <SearchResult key={community._id} community={community} />
            ))}
          </ul>
        </div>
      )}
      {debouncedSearchTerm &&
        !loading &&
        !error &&
        searchResults.length === 0 && (
          <Typography sx={{ mt: 2, color: "white" }}>
            No results found.
          </Typography>
        )}
    </Box>
  );
}

export default CommunitySearchBar;
