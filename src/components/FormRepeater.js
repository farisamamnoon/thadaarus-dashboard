import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { DeleteOutlined } from "@ant-design/icons";
import InputLabel from "themes/overrides/InputLabel";

const FormRepeater = ({ fields }) => {
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
      {formFields.map((formField) => (
        <div key={formField.id} style={{ marginBottom: "10px" }}>
          {fields.map((field) => (
            <TextField
              id={field.id}
              name={field.name}
              fullWidth
              type={field.type}
              sx={{ marginBottom: "5px" }}
              label={field.label}
              value={field.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
            />
          ))}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteOutlined />}
            onClick={() => removeFormField(formField.id)}
            sx={{ marginBottom: "15px" }}
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
