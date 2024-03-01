import PropTypes from "prop-types";

// material-ui
import { Box, Chip, Grid, Stack, Typography, CardHeader, Button } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// project import
import MainCard from "components/MainCard";

// assets
import { RiseOutlined, FallOutlined } from "@ant-design/icons";
import { CardActionArea } from "../../../node_modules/@mui/material/index";

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const ClassCard = ({ color, classStd, onDeleteClick, onEditClick, footer, onClassClick }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <CardActionArea>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          Class
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <CardHeader
              title={classStd}
              action={
                <div>
                  <Button size="small" variant="contained">
                    Add Class
                  </Button>
                </div>
              }
            />
          </Grid>
          {/* <Grid item container justifyContent="flex-end" sx={{ mb: "1rem" }}>
          <Button variant="contained">View Students</Button>
        </Grid> */}
          <Grid item container justifyContent="flex-end">
            {" "}
            <Button
              variant="outlined"
              // label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1 }}
              size="small"
              onClick={onEditClick}
            >
              <EditOutlined style={{ fontSize: "1rem", color: "inherit" }} />
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ ml: 1.25, pl: 1 }}
              size="small"
              onClick={onDeleteClick}
            >
              <DeleteOutlined style={{ fontSize: "1rem", color: "inherit" }} />
            </Button>
          </Grid>

          {/* <Grid item>
          <Chip
            variant="combined"
            color={color}
            icon={<DeleteOutlined style={{ fontSize: "1rem", color: "inherit" }} />}
            // label={`${percentage}%`}
            sx={{ ml: 1.25, pl: 1 }}
            size="small"
          />
        </Grid> */}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        {/* <Typography variant="caption" color="textSecondary">
        You made an extra{" "} */}
        <Typography component="span" variant="caption" sx={{ color: `${color || "primary"}.main` }}>
          {footer}
        </Typography>{" "}
        {/* this year
      </Typography> */}
      </Box>
    </CardActionArea>
  </MainCard>
);

ClassCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

ClassCard.defaultProps = {
  color: "primary",
};

export default ClassCard;
