import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, IconButton, CardHeader, Button } from "@mui/material";
import { useState, useRef, useCallback, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { fetchData } from "utils/fetchData";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "utils/formatDate";
import { Modal } from "@mui/material/index";
import modalStyle from "themes/modalStyle";
import axios from "axios";
import { base_url } from "utils/baseurl";
import { Alert, Snackbar, Switch } from "../../../node_modules/@mui/material/index";

function Events() {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [error, setError] = useState("gouii");
  const [openError, setOpenError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    data: eventsData,
    error: eventsError,
    isPending: eventsIsPending,
    refetch,
  } = useQuery({
    queryKey: ["eventsData"],
    queryFn: async () => await fetchData("event"),
  });

  const deleteEvent = async () => {
    try {
      setDeleting(true);
      await axios.delete(`${base_url}/event/${deleteId._id}`);
      setDeleting(false)
      setDeleteDialog(false);
      refetch();
    } catch (err) {
      setError(err.response.data.message || "An unexpected error occured");
      setDeleting(false);
      setOpenError(true);
      setDeleteDialog(false);
    }
  };

  const handleDeleteOpen = (rowData) => {
    setDeleteDialog(true);
    setDeleteId(rowData);
  };
  const handleDeleteClose = (rowData) => {
    setDeleteDialog(false);
    setDeleteId(rowData);
  };

  const columns = [
    {
      flex: 1,
      field: "event",
      headerName: "Event Name",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button size="medium" component={Link} to={`${row._id}`}>
              {row.name}
            </Button>
          </Box>
        );
      },
    },
    {
      flex: 1,
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
      field: "isFinished",
      headerName: "Finished",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row?.isFinished ? <DoneIcon /> : <AccessTimeIcon />}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      field: "actions",
      headerName: "Actions",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "row", spacing: "1px" }} gap={2}>
            <IconButton variant="outlined" component={Link} to={`/student/${row._id}/edit`}>
              <EditOutlined />
            </IconButton>
            <IconButton variant="contained" color="error" onClick={() => handleDeleteOpen(row)}>
              <DeleteOutlined />
            </IconButton>
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
      <Box boxShadow={4} sx={{ borderRadius: 4 }}>
        <CardHeader
          sx={{ bgcolor: "secondary.200" }}
          title="Events"
          action={
            <div>
              <Button size="medium" variant="contained" component={Link} to={`add`}>
                Add Event
              </Button>
            </div>
          }
        />
        <DataGrid
          autoHeight
          rows={eventsData || []}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
      <Modal
        open={deleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Delete Event
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete {deleteId.name}?
          </Typography>
          <Button onClick={handleDeleteClose} disabled={deleting}>No</Button>
          <Button onClick={deleteEvent} disabled={deleting}>Yes</Button>
        </Box>
      </Modal>
      <Snackbar open={openError} autoHideDuration={6000} onClose={() => setOpenError(false)}>
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Events;
