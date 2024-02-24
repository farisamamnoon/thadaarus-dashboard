import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Progress = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh", // Optionally, adjust the height to center vertically
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Progress;