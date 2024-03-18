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
import {
  LinearProgress,
  MenuItem,
  Modal,
  Select,
  InputLabel,
  FormControl,
} from "../../../node_modules/@mui/material/index";
import { useEffect, useState } from "react";
import modalStyle from "themes/modalStyle";
import Ranks from "./rankForm";
import FullFeaturedCrudGrid from "pages/testForm/index";
import AddProgram from "./addProgram";

function EventPrograms() {
  const [rankDialog, setRankDialog] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [category, setCategory] = useState("");
  const id = useParams().id;
  const {
    data: categories,
    error: categoriesError,
    isPending: categoriesIsPending,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await fetchData("event/categories"),
  });

  useEffect(() => {
    if (!categoriesIsPending) {
      setCategory(categories[0]._id);
    }
  }, [categories]);

  const {
    data: events,
    error: eventsError,
    isPending: eventsIsPending,
  } = useQuery({
    queryKey: ["eventsData", category],
    queryFn: () => {
      if (category) {
        return fetchData(`event/${id}/category/${category}`);
      }
      return null;
    },
    enabled: !!category,
  });

  if (categoriesError || eventsError) {
    return <Error severity="error">An unexpected error occured</Error>;
  }

  const addRank = () => console.log("Rank added");

  const handleRankOpen = (row) => {
    setRankDialog(true);
    setRowData(row);
  };
  const handleRankClose = () => setRankDialog(false);

  if (eventsIsPending) return <Progress />;

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
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FormControl fullWidth>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    name="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    {categoriesIsPending ? (
                      <LinearProgress />
                    ) : (
                      categories.map((c, i) => (
                        <MenuItem key={`categories.${i}`} value={c._id}>
                          {c.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                {/* <Button
                  size="medium"
                  variant="contained"
                  component={Link}
                  to={`add`}
                >
                  Add Event
                </Button> */}
                <AddProgram category={category} refetch={refetch} />
              </Box>
            </div>
          }
        />
        <DataGrid
          autoHeight
          rows={events?.programs.filter((program) => program.category === category) || []}
          columns={columns}
          getRowId={(row) => row._id}
        />
        {/* <FullFeaturedCrudGrid /> */}
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
            <Ranks data={rowData} />
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

export default EventPrograms;
