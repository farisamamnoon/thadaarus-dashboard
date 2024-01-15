import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, IconButton, Tooltip, CardHeader, Button } from "@mui/material";
import { useState, useRef, useCallback, useEffect, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// import { toast } from "react-hot-toast";
// import DeleteConfirmationDialog from "src/layouts/components/DeleteConfimationDialogBox";
// import { useDebounce } from "src/hooks/useDebounce";
import axios from "axios";

// type SortType = 'asc' | 'desc' | undefined | null

function ManageFaq() {
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
    { _id: 1, class: "Class 1", batch: '2014-15' ,teacher: "Name" },
    { _id: 2, class: "Class 2", batch: '2014-15' ,teacher: "Name" },
    { _id: 3, class: "Class 3", batch: '2014-15' ,teacher: "Name" },
    { _id: 4, class: "Class 4", batch: '2014-15' ,teacher: "Name" },
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
      flex: 0.275,
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
      flex: 0.275,
      minWidth: 290,
      field: "batch ",
      headerName: "Batch",
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
              {row.batch}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: "teacher",
      headerName: "Teacher",
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
              {row.teacher}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: "action",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Button
                size="medium"
                variant="contained"
                component={""}
                href={""}
              >
                View Students
              </Button>
        );
      },
    },
    // {
    //   flex: 0.1,
    //   minWidth: 130,
    //   headerName: 'Actions',
    //   field: 'actions',
    //   sortable: false,
    //   disableColumnMenu: true,

    //   renderCell: ( row ) => (
    //     <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //       {/* <Tooltip title='View'>
    //             <IconButton size='small' component={Link} href={/view/${row.id}}>
    //               <Icon icon='raphael:view' fontSize={20} />
    //             </IconButton>
    //           </Tooltip> */}

    //       <Tooltip title='Delete'>
    //         <IconButton onClick={() => deleteFaq(row._id)} size='small'>
    //           <Icon icon='tabler:trash' fontSize={20} />
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title='Edit'>
    //         <IconButton size='small' component={Link} href={/faq/edit/${row._id}}>
    //           <Icon icon='tabler:edit' fontSize={20} />
    //         </IconButton>
    //       </Tooltip>
    //     </Box>
    //   )
    // }
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
          title="Class List"
          action={
            <div>
              <Button
                size="medium"
                variant="contained"
                component={""}
                href={""}
              >
                Add New FAQ
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

export default ManageFaq;
