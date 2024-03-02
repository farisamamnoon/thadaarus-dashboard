//react imports
import { useState } from "react";
import { Link } from "react-router-dom";

//ui imports
import { DataGrid } from "@mui/x-data-grid";
import { Card, Box, CardHeader, Button, Modal, Typography, IconButton } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Grid } from "../../../node_modules/@mui/material/index";

//third party imports
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//project imports
import { fetchData } from "utils/fetchData";
import { base_url } from "utils/baseurl";
import Error from "utils/Error";
import Progress from "utils/Progress";
import modalStyle from "themes/modalStyle"
import ClassCard from "./ClassCard";

const Class = () => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  
  const {
    data: rows,
    refetch,
    error,
    isPending,
  } = useQuery({ queryKey: ["classData"], queryFn: async () => fetchData("class/get-all") });

  const deleteClass = async () => {
    const response = await axios.delete(`${base_url}/class/${deleteId._id}/delete`);
    setDeleteDialog(false);
    refetch();
  };

  const handleDeleteOpen = (rowData) => {
    setDeleteDialog(true);
    setDeleteId(rowData);
  };
  const handleDeleteClose = (rowData) => {
    setDeleteDialog(false);
    setDeleteId(rowData);
  };

  const handleClassClick = () => {
    console.log("clicked");
  };

  if (error) {
    return <Error severity="error">There was an unexpected error</Error>;
  }

  return (
    <div>
      {/* Breadcrumbs */}

      {/* <Breadcrumbs sx={{ mb: 4 }}>
        <Link href={/dashboard}>Home</Link>
        <Link href={/faq}>FAQ</Link>
        <Typography>Manage </Typography>
      </Breadcrumbs> */}
      {isPending ? (
        <Progress />
      ) : (
        <>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}
          >
            <Typography variant="h3">Class</Typography>
            <Button size="medium" variant="contained" component={Link} to={`add`}>
              Add Class
            </Button>
          </Grid>
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {Array.isArray(rows) &&
              rows.map((row) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ClassCard
                    classData={row}
                    onClick={handleClassClick}
                    onDelete={() => handleDeleteOpen(row)}
                  />
                </Grid>
              ))}
          </Grid>
        </>
      )}
      <Modal
        open={deleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Delete Class?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete class {deleteId.className} ?
          </Typography>
          <Button onClick={deleteClass}>Yes</Button>
          <Button onClick={handleDeleteClose}>No</Button>
        </Box>
      </Modal>
    </div>
  );
};


export default Class;
