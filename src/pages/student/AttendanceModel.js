//react imports
import { useEffect, useState } from "react";
import { useParams } from "../../../node_modules/react-router-dom/dist/index";

//ui imports
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Box, Modal, Typography } from "@mui/material/index";
import LoadingButton from "@mui/lab/LoadingButton";

//third party
import axios from "axios";

//project imports
import { base_url } from "utils/baseurl";
import { htmlDate } from "utils/formatDate";
import { Switch } from "../../../node_modules/@mui/material/index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const AddAttendanceModal = ({ onClose, open, data }) => {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(data);
  const [right, setRight] = useState([]);
  const [date, setDate] = useState("");
  const [submit, setSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const classId = useParams().id;

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    setDate(htmlDate);
  }, []);

  const saveAttendance = async () => {
    setLoading(true);
    const present = left.map((i) => i._id);
    const absent = right.map((i) => i._id);
    const values = { date, absent, present };
    try {
      const response = await axios.put(`${base_url}/class/${classId}/attendance`, values);
      if (!response.data.success) onClose();
      else {
        setSubmit(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setSubmit(error.message);
    }
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items, header) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value, key) => {
          const labelId = `transfer-list-item-${value.name}-label`;

          return (
            <ListItemButton key={`value.${key}`} role="listitem" onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${key + 1}: ${value.name}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Attendance
          </Typography>
          <input type="date" name={date} value={date} onChange={(e) => setDate(e.target.value)} />
        </Box>
        <Box>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>{customList(left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleAllRight}
                  disabled={left.length === 0}
                  aria-label="move all right"
                >
                  ≫
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleAllLeft}
                  disabled={right.length === 0}
                  aria-label="move all left"
                >
                  ≪
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Typography>Present</Typography>
          <Typography>Absent</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Typography>{submit}</Typography>
          <LoadingButton variant="contained" loading={loading} onClick={saveAttendance}>
            Save
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddAttendanceModal;
