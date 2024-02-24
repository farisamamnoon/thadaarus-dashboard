//react
import { useState } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "../../../node_modules/react-router-dom/dist/index";

//ui imports
import { DataGrid } from "@mui/x-data-grid";
import { CardHeader, Button, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

//Third Party
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//project imports
import { fetchData } from "utils/fetchData";
import { base_url } from "utils/baseurl";
import TimeTable from "./timeTable";
import Error from "utils/Error";
import Progress from "utils/Progress";
import modalStyle from "../../themes/modalStyle";
import { IconButton } from "../../../node_modules/@mui/material/index";

function Exam() {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [timetableDialog, setTimetableDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [timetableId, setTimetableId] = useState("");
  const classId = useParams().id;
  
  const {
    data: rows,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["examsData"],
    queryFn: async () => await fetchData(`exam/class/${classId}`),
  });
  
  const deleteExam = async () => {
    const response = await axios.delete(`${base_url}/exam/${deleteId._id}`);
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

  const handleTimetableOpen = (rowData) => {
    setTimetableDialog(true);
    setTimetableId(rowData);
  };
  const handleTimetableClose = (rowData) => {
    setTimetableDialog(false);
    setTimetableId(rowData);
  };

  if (error) {
    return <Error severity="error">There was an unexpected error</Error>;
  }

  const columns = [
    {
      flex: 0.5,
      // minWidth: 290,
      field: "examName",
      headerName: "Exam Name",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.examName}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.5,
      // minWidth: 290,
      field: "action",
      headerName: "Actions",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <>
            <Box sx={{ display: "flex", flexDirection: "row", spacing: "1px" }} gap={2}>
              <Button size="medium" variant="contained" onClick={() => handleTimetableOpen(row)}>
                View TimeTable
              </Button>
              <IconButton variant="outlined" component={Link} to={`/class/${classId}/exam/${row._id}/edit`}>
                <EditOutlined />
              </IconButton>
              <IconButton variant="contained" color="error" onClick={() => handleDeleteOpen(row)}>
                <DeleteOutlined />
              </IconButton>
            </Box>
          </>
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
          title={`Exams for Class `}/*${rows[0]?.classId?.className || 'Unknown Class'}*/
          action={
            <Button
              size="medium"
              variant="contained"
              component={Link}
              to={`/class/${classId}/exam/add`}
            >
              Add Exam
            </Button>
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
                //   value: searchValue,
                //   clearSearch: () => handleSearch(""),
                //   onChange: (event) => handleSearch(event.target.value),
              },
            }}
          />
        )}
      </Box>

      {/**Delete Confirmation modal */}
      <Modal
        open={deleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Delete Exam?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete {deleteId.examName}
          </Typography>
          <Button onClick={deleteExam}>Yes</Button>
          <Button onClick={handleDeleteClose}>No</Button>
        </Box>
      </Modal>

      {/**Time table modal */}
      <Modal
        open={timetableDialog}
        onClose={handleTimetableClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {timetableId.examName} for Class {timetableId.classId?.className}
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <TimeTable examId={timetableId} />
          </Box>
          <Button onClick={handleTimetableClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Exam;
