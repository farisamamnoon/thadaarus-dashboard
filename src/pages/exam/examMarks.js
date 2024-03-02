import { DataGrid } from "@mui/x-data-grid";
import { Card, CardHeader, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "utils/fetchData";
import { useParams } from "react-router-dom";
import Error from "utils/Error";
import MarksChart from "pages/testForm/index";

function ExamMarks() {
  const studentId = useParams().id;
  const {
    data: marksData,
    error: marksError,
    isPending: marksIsPending,
  } = useQuery({
    queryKey: ["marksData"],
    queryFn: async () => fetchData(`student/${studentId}/marks`),
  });
  if (marksError) return <Error severity="error">An unexpected error occured</Error>;

  // const columns = Object.keys(rows[0])
  //   .filter((key) => key !== "_id")
  //   .map((key) => ({
  //     flex: 1,
  //     minWidth: 290,
  //     field: key,
  //     headerName: key.charAt(0).toUpperCase() + key.slice(1),
  //     sortable: false,
  //     disableColumnMenu: true,

  //     renderCell: (params) => {
  //       const { row } = params;

  //       return (
  //         <Box sx={{ display: "flex", flexDirection: "column" }}>
  //           <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
  //             {row[key]}
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   }));
  // const columns = [
  //   {
  //     flex: 1,
  //     minWidth: 290,
  //     field: "name",
  //     headerName: "Student Name",
  //     sortable: false,
  //     disableColumnMenu: true,

  //     renderCell: (params) => {
  //       const { row } = params;

  //       return (
  //         <Box sx={{ display: "flex", flexDirection: "column" }}>
  //           <Typography
  //             noWrap
  //             variant="body2"
  //             sx={{ color: "text.primary", fontWeight: 600 }}
  //           >
  //             {row.name}
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     flex: 1,
  //     minWidth: 290,
  //     field: "subject1",
  //     headerName: "Subject 1",
  //     sortable: false,
  //     disableColumnMenu: true,

  //     renderCell: (params) => {
  //       const { row } = params;

  //       return (
  //         <Box sx={{ display: "flex", flexDirection: "column" }}>
  //           <Typography
  //             noWrap
  //             variant="body2"
  //             sx={{ color: "text.primary", fontWeight: 600 }}
  //           >
  //             {row.sub1}
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     flex: 1,
  //     minWidth: 290,
  //     field: "subject2",
  //     headerName: "Subject 2",
  //     sortable: false,
  //     disableColumnMenu: true,

  //     renderCell: (params) => {
  //       const { row } = params;

  //       return (
  //         <Box sx={{ display: "flex", flexDirection: "column" }}>
  //           <Typography
  //             noWrap
  //             variant="body2"
  //             sx={{ color: "text.primary", fontWeight: 600 }}
  //           >
  //             {row.sub2}
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     flex: 1,
  //     minWidth: 290,
  //     field: "subject3",
  //     headerName: "Subject 3",
  //     sortable: false,
  //     disableColumnMenu: true,

  //     renderCell: (params) => {
  //       const { row } = params;

  //       return (
  //         <Box sx={{ display: "flex", flexDirection: "column" }}>
  //           <Typography
  //             noWrap
  //             variant="body2"
  //             sx={{ color: "text.primary", fontWeight: 600 }}
  //           >
  //             {row.sub3}
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     flex: 1,
  //     minWidth: 290,
  //     field: "subject4",
  //     headerName: "Subject 4",
  //     sortable: false,
  //     disableColumnMenu: true,

  //     renderCell: (params) => {
  //       const { row } = params;

  //       return (
  //         <Box sx={{ display: "flex", flexDirection: "column" }}>
  //           <Typography
  //             noWrap
  //             variant="body2"
  //             sx={{ color: "text.primary", fontWeight: 600 }}
  //           >
  //             {row.sub4}
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     flex: 1,
  //     minWidth: 290,
  //     field: "total",
  //     headerName: "Total",
  //     sortable: false,
  //     disableColumnMenu: true,

  //     renderCell: (params) => {
  //       const { row } = params;

  //       return (
  //         <Box sx={{ display: "flex", flexDirection: "column" }}>
  //           <Typography
  //             noWrap
  //             variant="body2"
  //             sx={{ color: "text.primary", fontWeight: 600 }}
  //           >
  //             {row.total}
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  // ];

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
          title="Exam Marks"
          action={
            <div>
              <Button size="medium" variant="contained" component={Link} to={`add`}>
                Add Marks
              </Button>
            </div>
          }
        />
        {/* <DataGrid autoHeight rows={rows || []} columns={columns} getRowId={(row) => row._id} /> */}
        <MarksChart id={studentId} />
      </Card>
      {/* {openDeleteDialog && (
        <DeleteConfirmationDialog
          id={dialogId}
          buttonRef={buttonRef}
          name=""
          open={true}
          setOpen={setOpenDeleteDialog}
          // deleteFunction={deleteFaqData}
        />
      )} */}
    </div>
  );
}

export default ExamMarks;
