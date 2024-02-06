//react imports
import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

//ui imports
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, CardHeader, Button, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

//third party
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//utils
import { fetchData } from "utils/fetchData";
import { formatDate } from "utils/formatDate";
import { base_url } from "utils/baseurl";

function Exam() {
  const buttonRef = useRef(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editDialog, setEditDialog] = useState(false);
  const [editId, setEditId] = useState("");

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

  const handleDeleteOpen = (rowData) => {
    setDeleteDialog(true);
    setDeleteId(rowData._id);
  };
  const handleDeleteClose = (rowData) => {
    setDeleteDialog(false);
    setDeleteId(rowData._id);
  };

  const handleEditOpen = (rowData) => {
    setEditDialog(true);
    setEditId(rowData._id);
  };
  const handleEditClose = (rowData) => {
    setEditDialog(false);
    setEditId(rowData._id);
  };
  //api call
  const deleteHomework = async () => {
    const response = await axios.delete(`${base_url}/homework/${deleteId}`);
    window.location.reload();
    setDeleteDialog(false);
  };

  const {
    data: homeworks,
    error,
    isPending,
  } = useQuery({
    queryKey: ["homeworkData"],
    queryFn: async () => await fetchData("homework/get-all"),
  });

  if (error) {
    console.log("There has been an error");
  }
  if (isPending) {
    return <p>Loading...</p>;
  }
  const rows = homeworks;

  const columns = [
    {
      flex: 1,
      minWidth: 290,
      field: "date",
      headerName: "Date",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {formatDate(row.date)}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "homework",
      headerName: "Home Work",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography wrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.desc}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
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
              {row.classId.className}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "subject",
      headerName: "Subject",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{row.subjectId}</Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "students",
      headerName: "Completed Students",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.students}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "actions",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "row" }} gap={2}>
            <Button variant="contained">Add Students</Button>
            <Button
              variant="outlined"
              startIcon={<EditOutlined />}
              component={Link}
              to={`edit/${row._id}`}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlined />}
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
          title="Home Works"
          action={
            <div>
              <Button size="medium" variant="contained" component={Link} to={`add`}>
                Add HomeWork
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
          pagination
          sortingMode="server"
          paginationMode="server"
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
          handleDeleteOpen={handleDeleteOpen}
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
            Delete Homework
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this homework?
          </Typography>
          <Button onClick={deleteHomework}>Yes</Button>
          <Button onClick={handleDeleteClose}>No</Button>
        </Box>
      </Modal>
      <Modal
        open={editDialog}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Homework
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this homework?
          </Typography>
          <Button onClick={deleteHomework}>Yes</Button>
          <Button onClick={handleEditClose}>No</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Exam;
