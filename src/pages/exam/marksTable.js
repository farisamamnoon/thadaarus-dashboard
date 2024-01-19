import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, IconButton, CardHeader, Button } from "@mui/material";
import { useState, useRef, useCallback, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ExamMarks() {
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

  const rows = [
    { _id: 1, name: 'Faris', sub1: "Thaareekh", sub2: "Fiqh", sub3: "Quran", sub4: 'Arabic', total: '350/400' },
    { _id: 2, name: 'Faris', sub1: "Thaareekh", sub2: "Fiqh", sub3: "Quran", sub4: 'Arabic', total: '350/400' },
    { _id: 3, name: 'Faris', sub1: "Thaareekh", sub2: "Fiqh", sub3: "Quran", sub4: 'Arabic', total: '350/400' },
    { _id: 4, name: 'Faris', sub1: "Thaareekh", sub2: "Fiqh", sub3: "Quran", sub4: 'Arabic', total: '350/400' },
    
  ];
  // const query = useDebounce(searchValue, 1000);

  // const fetchTableData = useCallback(
  //   async (sort, q) => {
  //     await dataTableApi
  //       .getFaqDataTable({ query: { sort, q, page: paginationModel.page + 1 } })
  //       .then((res) => {
  //         setTotal(res.data.data.totalCount);
  //         setRows(res.data.data.faqs);
  //       });
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [paginationModel]
  // );

  // useEffect(() => {
  //   fetchTableData("asc", query);
  // }, [fetchTableData, query]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const deleteFaq = (id) => {
    setOpenDeleteDialog(true);
    setDialogId(id);
  };

  // const deleteFaqData = async (id) => {
  //   if (buttonRef.current) {
  //     buttonRef.current.disabled = true;
  //   }

  //   try {
  //     const response = await faqApi.deleteFaq(id, reqAuthHeader());
  //     toast.success(response?.data?.message);
  //     window.location.reload();
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       if (error.response) {
  //         toast.error(error.response.data.message);
  //       } else {
  //         toast.error("An error occurred.");
  //       }
  //     } else {
  //       toast.error("An unexpected error occurred.");
  //     }
  //     if (buttonRef.current) {
  //       buttonRef.current.disabled = false;
  //     }
  //   } finally {
  //     setOpenDeleteDialog(false);
  //   }
  // };

  const columns = [
    {
      flex: 1,
      minWidth: 290,
      field: "name",
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
      field: "subject1",
      headerName: "Subject 1",
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
              {row.sub1}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "subject2",
      headerName: "Subject 2",
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
              {row.sub2}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "subject3",
      headerName: "Subject 3",
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
              {row.sub3}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "subject4",
      headerName: "Subject 4",
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
              {row.sub4}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "total",
      headerName: "Total",
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
              {row.total}
            </Typography>
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
          title="Exam Timetable"
          action={
            <div>
              <Button
                size="medium"
                variant="contained"
                component={Link}
                to={`add`}
              >
                Add Marks
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
