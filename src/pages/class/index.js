//react imports
import { useState } from "react";
import { Link } from "react-router-dom";

//ui imports
import { DataGrid } from "@mui/x-data-grid";
import { Card, Box, CardHeader, Button, Modal, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

//third party imports
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//project imports
import { fetchData } from "utils/fetchData";
import { base_url } from "utils/baseurl";
import Error from "utils/Error";
import Progress from "utils/Progress";
import { IconButton } from "../../../node_modules/@mui/material/index";

const Class = () => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");

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

  const {
    data: rows,
    refetch,
    error,
    isPending,
  } = useQuery({ queryKey: ["classData"], queryFn: async () => fetchData("class/get-all") });
  if (error) {
    return <Error severity="error">There was an unexpected error</Error>;
  }

  const columns = [
    {
      flex: 0.16,
      minWidth: 50,
      field: "class",
      headerName: "Class",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.className}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.16,
      minWidth: 150,
      field: "batch ",
      headerName: "Batch",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.batch}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.16,
      minWidth: 200,
      field: "teacher",
      headerName: "Teacher",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.teacher}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.16,
      minWidth: 150,
      field: "fees",
      headerName: "Fees",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
            {row.fees}
          </Typography>
        );
      },
    },
    {
      flex: 0.16,
      minWidth: 100,
      field: "students",
      headerName: "Students",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <>
            <Box sx={{ display: "flex", flexDirection: "row", spacing: "1px" }} gap={2}>
              <Button size="medium" variant="contained" component={Link} to="/student">
                View
              </Button>
            </Box>
          </>
        );
      },
    },
    {
      flex: 0.16,
      minWidth: 100,
      field: "action",
      headerName: "Actions",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <>
            <Box sx={{ display: "flex", flexDirection: "row", spacing: "1px" }} gap={2}>
              <IconButton component={Link} to={`${row._id}/edit`}>
                <EditOutlined />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteOpen(row)}>
                <DeleteOutlined />
              </IconButton>
            </Box>
          </>
        );
      },
    },
  ];

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
          title="Class List"
          action={
            <div>
              <Button size="medium" variant="contained" component={Link} to={`add`}>
                Add Class
              </Button>
            </div>
          }
        />
        {isPending ? (
          <Progress />
        ) : (
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
          />
        )}
      </Card>
      <Modal
        open={deleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
