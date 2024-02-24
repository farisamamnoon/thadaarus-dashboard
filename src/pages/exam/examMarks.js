import { DataGrid } from "@mui/x-data-grid";
import { Card, CardHeader, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ExamMarks() {
  const rows = [
    {
      _id: 1,
      name: "Faris",
      sub1: "Thaareekh",
      sub2: "Fiqh",
      sub3: "Quran",
      sub4: "Arabic",
      total: "350/400",
    },
    {
      _id: 2,
      name: "Faris",
      sub1: "Thaareekh",
      sub2: "Fiqh",
      sub3: "Quran",
      sub4: "Arabic",
      total: "350/400",
    },
    {
      _id: 3,
      name: "Faris",
      sub1: "Thaareekh",
      sub2: "Fiqh",
      sub3: "Quran",
      sub4: "Arabic",
      total: "350/400",
    },
    {
      _id: 4,
      name: "Faris",
      sub1: "Thaareekh",
      sub2: "Fiqh",
      sub3: "Quran",
      sub4: "Arabic",
      total: "350/400",
    },
  ];

  const columns = Object.keys(rows[0])
    .filter((key) => key !== "_id")
    .map((key) => ({
      flex: 1,
      minWidth: 290,
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row[key]}
            </Typography>
          </Box>
        );
      },
    }));
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
          title="Exam Timetable"
          action={
            <div>
              <Button size="medium" variant="contained" component={Link} to={`add`}>
                Add Marks
              </Button>
            </div>
          }
        />
        <DataGrid
          autoHeight
          rows={rows || []}
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
