import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { DeleteOutlined } from "@ant-design/icons";
import InputLabel from "themes/overrides/InputLabel";

const FormRepeater = ({ secondField, label, type }) => {
  const [formFields, setFormFields] = useState([
    { id: 1, value1: "", value2: "" },
  ]);

  const addFormField = () => {
    setFormFields([
      ...formFields,
      { id: formFields.length + 1, value1: "", value2: "" },
    ]);
  };

  const removeFormField = (id) => {
    const updatedFormFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFormFields);
  };

  const handleChange = (id, field, value) => {
    const updatedFormFields = formFields.map((formField) =>
      formField.id === id ? { ...formField, [field]: value } : formField
    );
    setFormFields(updatedFormFields);
  };

  return (
    <div>
      {formFields.map((field) => (
        <div key={field.id} style={{ marginBottom: "10px" }}>
          <TextField
            id="input1"
            fullWidth
            type={type[0]}
            sx={{ marginBottom: "10px" }}
            label={`${label[0]}`}
            value={field.value1}
            onChange={(e) => handleChange(field.id, "value1", e.target.value)}
          />
          {secondField && (
            <TextField
              id="input2"
              fullWidth
              type={type[1]}
              sx={{ marginBottom: "10px" }}
              label={`${label[1]}`}
              value={field.value2}
              onChange={(e) => handleChange(field.id, "value2", e.target.value)}
            />
          )}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteOutlined />}
            onClick={() => removeFormField(field.id)}
            sx={{ marginTop: "10px" }}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={addFormField}
        sx={{ mb: "20px" }}
      >
        Add Fields
      </Button>
    </div>
  );
};

export default FormRepeater;
