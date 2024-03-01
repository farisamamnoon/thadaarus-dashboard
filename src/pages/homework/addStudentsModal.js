//react imports
import { useEffect, useState } from "react";

//ui imports
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  InputLabel,
  Typography,
  Chip,
  OutlinedInput,
  CircularProgress,
  FormHelperText,
} from "@mui/material";

//third party
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//project imports
import modalStyle from "../../themes/modalStyle";
import { fetchData } from "utils/fetchData";
import { base_url } from "utils/baseurl";

const AddStudentsModal = ({ handleStudentsDialogClose, addStudentsDialog, homeworkData }) => {
  const [students, setStudentsName] = useState([]);
  const [formError, setFormError] = useState("");
  const { _id, classId } = homeworkData;

  useEffect(() => setStudentsName(homeworkData?.students.map((s) => s._id)), [homeworkData]);

  const { data, error, isPending } = useQuery({
    queryKey: ["Students", classId],
    queryFn: async () => {
      if (classId) {
        return await fetchData(`student/class/${classId}`);
      }
      return null;
    },
    enabled: !!classId,
  });

  const addStudents = async () => {
    const values = { students };
    const response = await axios.put(`${base_url}/homework/${_id}/edit`, values);
    if (!response.data.success) setFormError(response.data.message);
    else handleStudentsDialogClose();
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStudentsName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const getStudentName = (studentId) => {
    const student = data.find((student) => student._id === studentId);
    return student ? student.name : "Unknown";
  };

  return (
    <Modal
      open={addStudentsDialog}
      onClose={handleStudentsDialogClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Add students who completed the homework
        </Typography>
        {isPending || error ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <InputLabel id="demo-multiple-chip-label">Add Completed Students</InputLabel>
            <Select
              fullWidth
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={students}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((studentId) => (
                    <Chip key={studentId} label={getStudentName(studentId)} />
                  ))}
                </Box>
              )}
            >
              {data.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={handleStudentsDialogClose}>Cancel</Button>
          <FormHelperText>{formError}</FormHelperText>
          <Button onClick={addStudents}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddStudentsModal;
