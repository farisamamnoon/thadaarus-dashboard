import { Alert, Box } from "@mui/material";

const Error = ({severity, children}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh", // Optionally, adjust the height to center vertically
      }}
    >
      <Alert severity={severity}>{children}</Alert>
    </Box>
  );
}

export default Error;