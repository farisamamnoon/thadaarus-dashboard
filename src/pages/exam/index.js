//react
import { useState, useRef, useCallback, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";

//material ui
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, IconButton, CardHeader, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//Third Party
import { fetchData } from "utils/fetchData";
import { useQuery } from "@tanstack/react-query";

function Exam() {
  const buttonRef = useRef(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogId, setDialogId] = useState("");

  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 15,
  });

  // const [rows, setRows] = useState([]);

  // const rows = [
  //   { _id: 1, date: "28/12/2009", subject: "Arabic" },
  //   { _id: 2, date: "28/12/2009", subject: "Arabic" },
  //   { _id: 3, date: "28/12/2009", subject: "Arabic" },
  // ];
  // const query = useDebounce(searchValue, 1000);

  const { data: exams, error, isPending} = useQuery({
    queryKey: ['examsData'],
    queryFn: async () => fetchData("exam/get-all")
  })
  console.log(exams);
  const rows = exams;

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const deleteFaq = (id) => {
    setOpenDeleteDialog(true);
    setDialogId(id);
  };

  const columns = [
    {
      flex: 1,
      // minWidth: 290,
      field: "examName",
      headerName: "Exam Name",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row.examName}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      // minWidth: 290,
      field: "classId",
      headerName: "Class",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row.classId}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      // minWidth: 290,
      field: "actions",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Button>View Time Table</Button>
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
      <Box display="flex" sx={{ flexDirection: "row-reverse", mb: '2px' }}>
        <Button size="medium" variant="contained" component={Link} to={`add`}>
          Add Exam
        </Button>
      </Box>
      <Box boxShadow={4} sx={{ borderRadius: 4 }}>
        <CardHeader
          sx={{ bgcolor: "secondary.200" }}
          title="Time Table for First Terminal Examination 2013(class specific)"
          action={
            <div>
              <Button
                size="medium"
                sx={{ margin: 2 }}
                variant="contained"
                component={Link}
                to={`marks`}
              >
                View Marks
              </Button>
            </div>
          }
        />
        <DataGrid
          autoHeight
          rows={rows || []}
          rowCount={total}
          columns={columns}
          getRowId={(row) => row._id}
          pagination
          sortingMode="server"
          paginationMode="server"
          pageSizeOptions={[2]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
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
              value: searchValue,
              clearSearch: () => handleSearch(""),
              onChange: (event) => handleSearch(event.target.value),
            },
          }}
        />
      </Box>

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

export default Exam;
