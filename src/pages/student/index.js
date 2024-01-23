import { DataGrid } from "@mui/x-data-grid";
import { Card, CardHeader, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function Student() {
  const rows = [
    {
      _id: 1,
      name: "Faris",
      phone: "09485094",
      address: "Sara Manzil po muzhappilangad, edakkad, 670662",
      group: "زهرة",
      attendance: "78%",
      fees: "90%",
    },
    {
      _id: 2,
      name: "Faris",
      phone: "09485094",
      address: "Sara Manzil po muzhappilangad, edakkad, 670662",
      group: "زهرة",
      attendance: "78%",
      fees: "90%",
    },
    {
      _id: 3,
      name: "Faris",
      phone: "09485094",
      address: "Sara Manzil po muzhappilangad, edakkad, 670662",
      group: "زهرة",
      attendance: "78%",
      fees: "90%",
    },
    {
      _id: 4,
      name: "Faris",
      phone: "09485094",
      address: "Sara Manzil po muzhappilangad, edakkad, 670662",
      group: "زهرة",
      attendance: "78%",
      fees: "90%",
    },
  ];

  const columns = [
    {
      flex: 1,
      minWidth: 290,
      field: "studentname",
      headerName: "Student Name",
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
              {row.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "contact",
      headerName: "Contact No.",
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
              {row.phone}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "addres",
      headerName: "Address",
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
              {row.address}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "group",
      headerName: "Event Group",
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
              {row.group}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      // minWidth: 290,
      field: "attendance",
      headerName: "Attendance",
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
              {row.attendance}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      // minWidth: 290,
      field: "fees",
      headerName: "Fees",
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
              {row.fees}
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
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button component={Link} to="add">
              <EditOutlined />
            </Button>
            <Button component={Link} to="add">
              <DeleteOutlined />
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
              <Button
                size="medium"
                variant="contained"
                component={Link}
                to={`add`}
              >
                Add New Student
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

export default Student;
