import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

import fetchAPI from "../../../api/fetchAPI";
import Input from "../inputs/Input";
import Dropdown from "../inputs/Dropdown";

const RegisterModal = ({
  open,
  onClose,
  eventId,
  eventName,
  availableRoles,
  onRegisterSuccess,
  questions,
}) => {
  const [preferredRole, setPreferredRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState(
    Array(questions && questions.length).fill("")
  );

  const values = availableRoles.map((role) => ({
    name: role.toLowerCase(),
    label: role,
  }));

  const handleDropdownChange = (newValue) => {
    setPreferredRole(newValue);
  };

  useEffect(() => {
    if (open) {
      setPreferredRole("");
      setLoading(false);
      setError("");
    }
  }, [open]);

  const handleAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    if (!preferredRole && availableRoles.length > 0) {
      setError("Please select a preferred role.");
      setLoading(false);
      return;
    }

    try {
      const registrationData = {
        preferredRole: preferredRole || null,
        answers: answers,
      };

      const data = await fetchAPI(`/events/register/${eventId}`, {
        method: "POST",
        body: JSON.stringify(registrationData),
      });

      console.log("Registration data:", data);
      if (onRegisterSuccess) {
        onRegisterSuccess(data);
      }
      onClose();
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: "#1E1E1E", color: "white" }}>
        Register for "{eventName}"
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1E1E1E", color: "white", pt: 2 }}>
        <Input name="name" labelName="Name:" required={true} />
        {availableRoles && availableRoles.length > 0 && (
          <Dropdown
            label="Preferred Role:"
            name="role"
            values={values}
            onSelectionChange={handleDropdownChange}
          />
        )}
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <Input
                key={`question-${index}`}
                name={`question-${index}`}
                labelName={question}
                value={answers[index]}
                onChange={(value) => handleAnswerChange(index, value)}
              />
            );
          })}

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions
        sx={{ backgroundColor: "#1E1E1E", borderTop: "1px solid #333" }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{ color: "gray", "&:hover": { color: "white" } }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleRegister}
          disabled={loading || (availableRoles.length > 0 && !preferredRole)}
          variant="contained"
          sx={{
            backgroundColor: "#4B5563",
            color: "white",
            "&:hover": { backgroundColor: "#6B7280" },
          }}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterModal;
