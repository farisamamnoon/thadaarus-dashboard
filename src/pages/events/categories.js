import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, IconButton, CardHeader, Button } from "@mui/material";
import { useState, useRef, useCallback, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material/index";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "utils/fetchData";
import Progress from "utils/Progress";
import Error from "utils/Error";
import { formatDate } from "utils/formatDate";

function EventStudents() {
  const {
    data: rows,
    isPending,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await fetchData("event/categories"),
  });
  if (isPending) return <Progress />;
  if (error) return <Error severity="error">An unexpected error occured</Error>;

  const columns = [
    {
      flex: 1,
      field: "categories",
      headerName: "Categories",
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
      flex: 1,
      field: "date",
      headerName: "Info",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {formatDate(row.fromDate)}{" to "}{formatDate(row.toDate)}
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
            <IconButton variant="contained" color="error" /*onClick={() => handleDeleteOpen(row)}*/>
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
          title="Categories"
          action={
            <div>
              <Button size="medium" variant="contained" component={Link} to={`add`}>
                Add Category
              </Button>
            </div>
          }
        />
        <DataGrid autoHeight rows={rows || []} columns={columns} getRowId={(row) => row._id} />
      </Box>
    </div>
  );
}

export default EventStudents;
