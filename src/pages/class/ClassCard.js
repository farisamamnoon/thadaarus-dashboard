//react imports
import { useState } from "react";

//ui imports
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardActions,
  Avatar,
  IconButton,
  CardActionArea,
  Link,
  Tooltip,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import { blue } from "@mui/material/colors";

//icon imports
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ClassCard = ({
  classData,
  onClick,
  onDelete,
  examRoute,
  homeworkRoute,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onDelete();
  };

  return (
    <Card sx={{ maxWidth: 345, minHeight: 150, boxShadow: 3, borderRadius: "16px" }}>
      <CardActionArea onClick={onClick}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="class">
              {classData.className} {classData.division}
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <DeleteIcon />
                </MenuItem>
                <MenuItem onClick={() => navigate(`/class/${classData._id}/edit`)}>
                  <EditIcon />
                </MenuItem>
              </Menu>
            </>
          }
          title={classData?.teacherId?.name || "No teacher assigned"}
          subheader="Class Teacher"
        />
      </CardActionArea>
      <Grid sx={{ display: "flex", mb: "1px" }}>
        <CardActions disableSpacing>
          <Tooltip title="Students" placement="top">
            <IconButton
              aria-label="students"
              onClick={() => navigate(`/class/${classData._id}/student`)}
            >
              <AccessibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Exams" placement="top">
            <IconButton aria-label="exams" onClick={()=> navigate(`/class/${classData._id}/exam`)}>
              <AssignmentIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="HomeWork" placement="top">
            <IconButton aria-label="homework" onClick={()=> navigate(`/class/${classData._id}/homework`)}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Fees" placement="top">
            <IconButton aria-label="fees" component={Link} to={homeworkRoute}>
              <PaymentIcon />
            </IconButton>
          </Tooltip> */}
        </CardActions>
      </Grid>
    </Card>
  );
};

export default ClassCard;
