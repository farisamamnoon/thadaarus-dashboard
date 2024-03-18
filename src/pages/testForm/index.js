import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import {
  CardHeader,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material/index";
import { useState } from "react";
import Progress from "utils/Progress";
import Error from "utils/Error";
import { fetchData } from "utils/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "../../../node_modules/@mui/material/index";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});
  const [category, setCategory] = useState("");
  const id = useParams().id;
  const {
    data: categories,
    error: categoriesError,
    isPending: categoriesIsPending,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await fetchData("event/categories"),
  });

  useEffect(() => {
    if (!categoriesIsPending) {
      setCategory(categories[0]);
    }
  }, [categories, categoriesIsPending]);

  const {
    data: events,
    error: eventsError,
    isPending: eventsIsPending,
  } = useQuery({
    queryKey: ["eventsData", category],
    queryFn: () => {
      if (category) {
        console.log(category._id);
        return fetchData(`event/${id}/category/${category._id}`);
      }
      return null;
    },
    enabled: !!category,
  });

  // useEffect(() => setRows(events?.programs), [events]);
  if (categoriesError || eventsError) {
    return <Error severity="error">An unexpected error occured</Error>;
  }
  if (eventsIsPending) return <Progress />;

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "name",
      headerName: "Event Name",
      width: 180,
      sortable: false,

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
      field: "gold",
      headerName: "Gold",
      width: 180,
      sortable: false,
      editable: true,
      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {/* {row?.ranking.at(0) || "Not Available"} */}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "silver",
      headerName: "Silver",
      width: 180,
      sortable: false,
      editable: true,
      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {/* {row?.ranking.at(1) || "Not Available"} */}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "bronze",
      headerName: "Bronze",
      width: 180,
      sortable: false,
      editable: true,
      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {/* {row?.ranking.at(2) || "Not Available"} */}
            </Typography>
          </Box>
        );
      },
    },
    // {
    //   field: "gold",
    //   headerName: "Gold",
    //   type: "number",
    //   width: 80,
    //   align: "left",
    //   headerAlign: "left",
    //   editable: true,
    // },
    // {
    //   field: "joinDate",
    //   headerName: "Join date",
    //   type: "date",
    //   width: 180,
    //   editable: true,
    // },
    {
      field: "role",
      headerName: "Department",
      width: 220,
      editable: true,
      sortable: false,
      type: "singleSelect",
      valueOptions: ["Market", "Finance", "Development"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <CardHeader
        sx={{ bgcolor: "secondary.200" }}
        title="Events"
        action={
          <div>
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
                  // <MenuItem key={1}>Hi</MenuItem>
                )}
              </Select>
            </FormControl>
            {/* <Button size="medium" variant="contained" component={Link} to={`add`} disabled={true}>
          Add Event
        </Button> */}
          </div>
        }
      />
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
