import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Card,
  IconButton,
  CardHeader,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, useRef, useCallback, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toEditorSettings } from "../../../node_modules/typescript/lib/typescript";

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

  const rows = [
    {
      _id: 1,
      class: "Class 1",
      date: "21/6/2011",
      desc: "Name",
      subject: "Arabic",
      students: "Everyone",
    },
    {
      _id: 2,
      class: "Class 1",
      date: "21/6/2011",
      desc: "Name",
      subject: "Arabic",
      students: "Everyone",
    },
    {
      _id: 3,
      class: "Class 1",
      date: "21/6/2011",
      desc: "Name",
      subject: "Arabic",
      students: "Everyone",
    },
    {
      _id: 4,
      class: "Class 1",
      date: "21/6/2011",
      desc: "Name",
      subject: "Arabic",
      students: "Everyone",
    },
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
      field: "date",
      headerName: "Date",
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
              {row.date}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "homework",
      headerName: "HomeWork",
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
              {row.desc}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "class",
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
              {row.class}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "subject",
      headerName: "Subject",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{row.subject}</Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "students",
      headerName: "Completed Students",
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
              {row.students}
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
          title="Home Works"
          action={
            <div>
              <Button
                size="medium"
                variant="contained"
                component={Link}
                to={`add`}
              >
                Add HomeWork
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

export default Exam;
