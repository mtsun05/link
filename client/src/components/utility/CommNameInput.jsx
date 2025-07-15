import React, { useState, useEffect, useRef, useCallback } from "react";

function CommunityNameInput({ initialName = "" }) {
  const [communityName, setCommunityName] = useState(initialName);
  const [isNameAvailable, setIsNameAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceTimeoutRef = useRef(null);

  const checkNameAvailability = useCallback(async (name) => {
    if (name.trim() === "") {
      setIsNameAvailable(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setIsNameAvailable(null);
    setError(null);

    try {
      const response = await fetch(
        `https://localhost:5050/communities/check-name?name=${encodeURIComponent(
          name
        )}`
      );
      const data = await response.json();

      if (response.ok) {
        setIsNameAvailable(data.available);
      } else {
        setError(data.message || "Error checking name availability.");
        setIsNameAvailable(null);
      }
    } catch (e) {
      console.error("Network or parsing error during name check:", e);
      setError("Could not connect to server to check name.");
      setIsNameAvailable(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      checkNameAvailability(communityName);
    }, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [communityName, checkNameAvailability]);

  const handleChange = (e) => {
    setCommunityName(e.target.value);
  };

  return (
    <>
      <label
        className="block text-md font-medium text-slate-100"
        htmlFor="communityName"
      >
        Community Name:
      </label>
      <input
        id="communityName"
        type="text"
        value={communityName}
        onChange={handleChange}
        name="name"
        className="text-white font-[helvetica] rounded-md p-1 w-2/3 bg-[#222222] border-2 border-gray-400"
      />
      {loading && <p>Checking availability...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isNameAvailable !== null && !loading && !error && (
        <p style={{ color: isNameAvailable ? "green" : "red" }}>
          {isNameAvailable ? "Name is available!" : "Name is already taken."}
        </p>
      )}
    </>
  );
}

export default CommunityNameInput;
