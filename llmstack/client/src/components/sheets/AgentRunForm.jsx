import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";

const AgentRunForm = ({ setData, agentInstructions, selectedTools }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [instructions, setInstructions] = useState(agentInstructions || "");
  const [tools, setTools] = useState(selectedTools || []);

  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
    setData({ agent_instructions: event.target.value });
  };

  const handleToolsChange = (event) => {
    const selectedTools = event.target.value;
    setTools(selectedTools);
    setData({ selected_tools: selectedTools });
  };

  const handleAdvancedToggle = (event) => {
    setShowAdvanced(event.target.checked);
  };

  const availableTools = [
    "Web Search",
    "URL Extraction",
    "People Search",
    "Email Search",
    "Google Search",
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label="Agent Instructions"
        placeholder="Provide instructions to the LLM agent"
        multiline
        rows={4}
        value={instructions}
        onChange={handleInstructionsChange}
        variant="outlined"
        fullWidth
        sx={{
          marginBottom: 2,
          "& .MuiInputBase-root": {
            "& fieldset": {
              border: "solid 1px #ccc",
              borderRadius: "8px",
              boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
            },
          },
          "& .MuiOutlinedInput-root": {
            boxShadow: "none",
            borderRadius: "8px",
            fontSize: "14px",
            "& .MuiOutlinedInput-input": {
              padding: "10px",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "8px !important",
            boxShadow: "0px 0px 4px #e8ebee",
          },
          "& .MuiInputLabel-root": {
            fontSize: "14px",
            fontWeight: "600",
            color: "text.secondary",
            marginTop: "0px",
          },
        }}
      />
      <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
        <InputLabel
          id="tools-select-label"
          sx={{ lineHeight: "14px", minHeight: "14px" }}
        >
          Tools
        </InputLabel>
        <Select
          labelId="tools-select-label"
          multiple
          value={tools}
          onChange={handleToolsChange}
          input={<OutlinedInput label="Tools" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          sx={{
            "& .MuiInputBase-root": {
              "& fieldset": {
                border: "solid 1px #ccc",
                borderRadius: "8px",
                boxShadow:
                  "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
              },
            },
            "& .MuiSelect-select": {
              padding: "0px",
              paddingTop: "1px",
              minHeight: "36px",
            },
            "& .MuiOutlinedInput-root": {
              boxShadow: "none",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "600",
              color: "text.secondary",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "8px !important",
              boxShadow: "0px 0px 4px #e8ebee",
            },
          }}
        >
          {availableTools.map((tool) => (
            <MenuItem key={tool} value={tool}>
              <Typography variant="body1" color="text.secondary">
                {tool}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        sx={{
          ml: 0,
          mt: 2,
          "& .MuiFormControlLabel-label": {
            fontSize: "0.9rem",
            color: "text.secondary",
          },
        }}
        control={
          <Switch
            checked={showAdvanced}
            onChange={handleAdvancedToggle}
            size="small"
          />
        }
        label="Show Advanced Options"
      />
      {showAdvanced && <Box sx={{ mt: 2 }}></Box>}
    </Box>
  );
};

export default AgentRunForm;