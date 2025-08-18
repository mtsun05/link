import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import Button from "../buttons/Button";

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
      <DialogTitle sx={{ backgroundColor: "#1d1f24", color: "white" }}>
        Register for "{eventName}"
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1d1f24", color: "white", pt: 2 }}>
        <Input name="name" labelName="Name:" required={true} />
        {availableRoles && availableRoles.length > 0 && (
          <Dropdown
            label="Preferred Role:"
            name="role"
            values={availableRoles}
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
        sx={{
          backgroundColor: "#1d1f24",
          borderTop: "1px solid #333",
        }}
      >
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleRegister}
          disabled={loading || (availableRoles.length > 0 && !preferredRole)}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterModal;
