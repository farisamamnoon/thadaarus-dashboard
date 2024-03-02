import { DataGrid } from "@mui/x-data-grid";
import { CardHeader, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fetchData } from "utils/fetchData";
import Error from "utils/Error";
import Progress from "utils/Progress";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "../../../node_modules/@mui/material/index";
import { useState } from "react";
import modalStyle from 'themes/modalStyle';
import Ranks from "./rankForm";

function EventGroups() {
  const [rankDialog, setRankDialog] = useState(false);
  const [rowData, setRowData] = useState(null);
  const id = useParams().id;

  const { data, error, isPending } = useQuery({
    queryKey: ["eventData"],
    queryFn: async () => await fetchData(`event/${id}`),
  });
  if (error) {
    return <Error severity="error">An unexpected error occured</Error>;
  }
  if (isPending) {
    return <Progress />;
  }
  
  const addRank = () => console.log("Rank added");

  const handleRankOpen = (row) => {
    setRankDialog(true);
    setRowData(row);
  };
  const handleRankClose = () => setRankDialog(false);

  const rows = data.programs;
  const columns = [
    {
      flex: 0.2,
      field: "group",
      headerName: "Event Name",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.programName}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      field: "gold",
      headerName: "Gold",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row?.ranking.at(0) || "Not Available"}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      field: "silver",
      headerName: "Silver",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row?.ranking.at(1) || "Not Available"}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      field: "bronze",
      headerName: "Bronze",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row?.ranking.at(2) || "Not Available"}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      field: "actions",
      headerName: "Actions",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button size="medium" variant="contained" onClick={() => handleRankOpen(row)}>
              Mark Rankings
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
      <Box boxShadow={4} sx={{ borderRadius: 4 }}>
        <CardHeader
          sx={{ bgcolor: "secondary.200" }}
          title="Events"
          action={
            <div>
              <Button size="medium" variant="contained" component={Link} to={`add`} disabled={true}>
                Add Event
              </Button>
            </div>
          }
        />
        <DataGrid autoHeight rows={rows || []} columns={columns} getRowId={(row) => row._id} />
        <Modal
          open={rankDialog}
          onClose={handleRankClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Delete Student
            </Typography>
            <Ranks data={rowData}/>
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

export default EventGroups;
