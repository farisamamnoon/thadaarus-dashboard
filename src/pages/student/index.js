//react imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//material ui imports
import { Card, CardHeader, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


//third party
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//project imports
import { fetchData } from "utils/fetchData";
import { base_url } from "utils/baseurl";
import Progress from "utils/Progress";
import Error from "utils/Error";

function Student() {
  const [deleteDialog, setDeleteDialog] = useState(false);
  // const [deleted, setDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [studentData, setStudentData] = useState("");

  const deleteStudent = async () => {
    const response = await axios.delete(`${base_url}/student/${deleteId._id}/delete`);
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
  };

  const {
    data: rows,
    error,
    isPending,
  } = useQuery({
    querykey: ["studentData", 1],
    queryFn: async () => fetchData("student/get-all"),
  });

  if (error) {
    return <Error severity="error">There was an unexpected error</Error>;
  }

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
      field: "studentname",
      headerName: "Student Name",
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
      field: "addres",
      headerName: "Address",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.address}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: "group",
      headerName: "Event Group",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.group}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: "attendance",
      headerName: "Attendance",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.attendance}
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
            <Button
              variant="outlined"
              startIcon={<EditOutlined />}
              component={Link}
              to={`${row._id}/edit`}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteOutlined />}
              color="error"
              onClick={() => handleDeleteOpen(row)}
            >
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

      {/* <Breadcrumbs sx={{ mb: 4 }}>
        <Link href={/dashboard}>Home</Link>
        <Link href={/faq}>FAQ</Link>
        <Typography>Manage </Typography>
      </Breadcrumbs> */}
      <Card>
        <CardHeader
          title="Student List"
          action={
            <div>
              <Button size="medium" variant="contained" component={Link} to={`add`}>
                Add New Student
              </Button>
            </div>
          }
        />
       {isPending ? (<Progress />) : (<DataGrid
          autoHeight
          rows={rows || []}
          // rowCount={total}
          columns={columns}
          getRowId={(row) => row._id}
          // pagination
          sortingMode="server"
          // paginationMode="server"
          pageSizeOptions={[2]}
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
        />) }
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
          <Button onClick={deleteStudent}>Yes</Button>
          <Button onClick={handleDeleteClose}>No</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Student;
