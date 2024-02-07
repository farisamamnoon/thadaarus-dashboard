//react imports
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

//mui imports
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardHeader, Button, Breadcrumbs, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//third party
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//project imports
import { fetchData } from "utils/fetchData";
import { base_url } from "utils/baseurl";

function Teacher() {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const deleteTeacher = async () => {
    const response = await axios.delete(`${base_url}/teacher/${deleteId._id}/delete`);
    setDeleteDialog(false);
    window.location.reload();
  };

  const handleDeleteOpen = (rowData) => {
    setDeleteDialog(true);
    setDeleteId(rowData);
  };
  const handleDeleteClose = (rowData) => {
    setDeleteDialog(false);
    setDeleteId(rowData);
  }
  
  const {
    data: teachers,
    error,
    isPending,
  } = useQuery({
    queryKey: ["teacherData"],
    queryFn: async () => fetchData("teacher/get-all"),
  });
  if (error) {
    console.log("error", error);
  }
  if (isPending) {
    return <p>Laoding....</p>;
  }
  const rows = teachers;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const columns = [
    {
      flex: 0.275,
      minWidth: 290,
      field: "teachername",
      headerName: "Teacher Name",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: "contact",
      headerName: "Contact No.",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.phone}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: "class",
      headerName: "Class",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row?.class?.className}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: "actions",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "row", spacing: "1px" }} gap={2}>
            <Button variant="contained" component={Link} to={`${row._id}/edit`}>
              Edit
            </Button>
            <Button variant="contained" onClick={() => handleDeleteOpen(row)}>
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <div>
      {/* Breadcrumbs */}

      <Breadcrumbs sx={{ mb: 4 }}>
        <Link >Home</Link>
        <Link >FAQ</Link>
        <Typography>Manage </Typography>
      </Breadcrumbs>
      <Card>
        <CardHeader
          title="Teachers"
          action={
            <div>
              <Button size="medium" variant="contained" component={Link} to={`add`}>
                Add New Teacher
              </Button>
            </div>
          }
        />
        <DataGrid
          autoHeight
          rows={rows || []}
          // rowCount={total}
          columns={columns}
          getRowId={(row) => row._id}
          // pagination
          sortingMode="server"
          // paginationMode="server"
          // pageSizeOptions={[2]}
          // paginationModel={paginationModel}
          // onPaginationModelChange={setPaginationModel}
          slotProps={{
            baseButton: {
              size: "medium",
              variant: "tonal",
            },
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 1000 },
              // value: searchValue,
              // clearSearch: () => handleSearch(""),
              // onChange: (event) => handleSearch(event.target.value),
            },
          }}
        />
      </Card>

      <Modal
        open={deleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Student
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete {deleteId.name}?
          </Typography>
          <Button onClick={deleteTeacher}>Yes</Button>
          <Button onClick={handleDeleteClose}>No</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Teacher;
