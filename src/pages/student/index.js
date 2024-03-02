//react imports
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

//material ui imports
import { Card, CardHeader, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "../../../node_modules/@mui/material/index";
import VisibilityIcon from '@mui/icons-material/Visibility';

//third party
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//project imports
import { fetchData } from "utils/fetchData";
import { base_url } from "utils/baseurl";
import Progress from "utils/Progress";
import Error from "utils/Error";
import { addFees, getBalance } from "utils/fees";
import AddFeeModel from "./AddFeeModel";
import AddAttendanceModal from "./AttendanceModel";
import modalStyle from "themes/modalStyle";
import FeesDetails from "./FeesDetails";

function Student() {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addFeeDialog, setAddFeeDialog] = useState(false);
  const [attendanceDialog, setAttendanceDialog] = useState(false);
  const [viewFeeDialog, setViewFeeDialog] = useState(false);
  const [studentData, setStudentData] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const classId = useParams().classId;
  const navigate = useNavigate();

  //delete student
  const deleteStudent = async () => {
    const response = await axios.delete(`${base_url}/student/${deleteId._id}/delete`);
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

  //add fees handlers
  const handleAddFeeOpen = (row) => {
    setAddFeeDialog(true);
    setStudentData(row);
  };
  const handleAddFeeClose = (row) => {
    setAddFeeDialog(false);
    refetch();
  };
  
  //view fees handlers
  const handleViewFeeOpen = (row) => {
    setViewFeeDialog(true);
    setStudentData(row);
  };
  const handleViewFeeClose = (row) => {
    setViewFeeDialog(false);
    refetch();
  };

  //attendance handlers
  const handleAttendaceOpen = () => setAttendanceDialog(true);
  const handleAttendaceClose = () => setAttendanceDialog(false);

  const {
    data: rows,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["studentData"],
    queryFn: async () => fetchData(`student/class/${classId}`),
  });

  if (error) {
    return <Error severity="error">There was an unexpected error</Error>;
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
      flex: 0.15,
      // minWidth: 290,
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
      // minWidth: 290,
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
      // minWidth: 290,
      field: "fees",
      headerName: "Fee Balance",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {getBalance(
                row.class.fees,
                addFees(row.fees).totalFees,
                addFees(row.fees).totalDiscount
              )}
            </Typography>
            <IconButton aria-label="addFees" color="primary" onClick={() => handleAddFeeOpen(row)}>
              <AddBoxIcon />
            </IconButton>
            <IconButton aria-label="viewFees" color="primary" onClick={() => handleViewFeeOpen(row)}>
              <VisibilityIcon />
            </IconButton>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      // minWidth: 290,
      field: "exam",
      headerName: "Marks",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "row", spacing: "1px" }} gap={2}>
            <Button variant="contained" component={Link} to={`${row._id}/marks`}>
             View
            </Button>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      // minWidth: 290,
      field: "actions",
      headerName: "",
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
      <Card>
        <CardHeader
          title="Student List"
          action={
            <div>
              <Button size="medium" variant="contained" onClick={handleAttendaceOpen}>
                Take Attendance
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
            columns={columns}
            getRowId={(row) => row._id}
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
      <Modal
        open={viewFeeDialog}
        onClose={handleViewFeeClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
           Fees details of {studentData.name} 
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <FeesDetails data={studentData}/>
          </Box>
          <Button onClick={handleViewFeeClose}>Close</Button>
        </Box>
      </Modal>
      {addFeeDialog && (
        <AddFeeModel open={addFeeDialog} onClose={handleAddFeeClose} data={studentData} />
      )}
      {attendanceDialog && (
        <AddAttendanceModal open={attendanceDialog} onClose={handleAttendaceClose} data={rows} />
      )}
    </div>
  );
}

export default Student;
