//react imports
import { useState } from "react";
import { Link } from "react-router-dom";

//ui imports
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardHeader, Button, Modal, Box, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

//third party
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//utils
import { fetchData } from "utils/fetchData";
import { formatDate } from "utils/formatDate";
import { base_url } from "utils/baseurl";
import AddStudentsModal from "./addStudentsModal";
import modalStyle from "../../themes/modalStyle";
import { useParams } from "../../../node_modules/react-router-dom/dist/index";
import Error from "utils/Error";
import Progress from "utils/Progress";
import { IconButton } from "../../../node_modules/@mui/material/index";
import AddIcon from "@mui/icons-material/Add";

function HomeWork() {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [addStudentsDialog, setAddStudentsDialog] = useState(false);
  const [homeworkData, setHomeworkData] = useState("");
  const classId = useParams().id;

  const {
    data: rows,
    refetch,
    error,
    isPending,
  } = useQuery({
    queryKey: ["homeworkData"],
    queryFn: async () => await fetchData(`homework/class/${classId}`),
  });

  const deleteHomework = async () => {
    const response = await axios.delete(`${base_url}/homework/${deleteId}`);
    refetch();
    setDeleteDialog(false);
  };

  const handleStudentsDialogOpen = (row) => {
    setAddStudentsDialog(true);
    setHomeworkData(row);
  };
  const handleStudentsDialogClose = () => {
    setAddStudentsDialog(false);
    refetch();
  };

  const handleDeleteOpen = (row) => {
    setDeleteDialog(true);
    setDeleteId(row._id);
  };
  const handleDeleteClose = () => setDeleteDialog(false);

  if (error) {
    return <Error severity="error">An unexpected error occured</Error>;
  }
  if (isPending) {
    return <Progress />;
  }

  const columns = [
    {
      flex: 0.1,
      // minWidth: 290,
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
      flex: 0.3,
      // minWidth: 290,
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
      flex: 0.1,
      // minWidth: 290,
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
      flex: 0.3,
      // minWidth: 290,
      field: "students",
      headerName: "Completed Students",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;
        return (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <IconButton variant="outlined" onClick={() => handleStudentsDialogOpen(row)}>
              <AddIcon />
            </IconButton>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row?.students?.map((s) => s.name).join(", ")}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      // minWidth: 290,
      field: "actions",
      headerName: "Actions",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "row" }} gap={2}>
            <Button component={Link} to={`${row._id}/edit`}>
              <EditOutlined />
            </Button>
            <IconButton variant="outlined" color="error" onClick={() => handleDeleteOpen(row)}>
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
      <Card>
        <CardHeader
          title="Home Works"
          action={
            <div>
              <Button
                size="medium"
                variant="contained"
                component={Link}
                to={`/class/${classId}/homework/add`}
              >
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
          // pagination
          // sortingMode="server"
          // paginationMode="server"
          //pageSizeOptions={[2]}
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

      {/* delete confirmation model */}

      {/* delete confirmation model */}
      <Modal
        open={deleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
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

      {homeworkData && (
        <AddStudentsModal
          handleStudentsDialogClose={handleStudentsDialogClose}
          addStudentsDialog={addStudentsDialog}
          homeworkData={homeworkData}
        />
      )}
    </div>
  );
}

export default HomeWork;
