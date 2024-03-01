// assets
import { LoginOutlined, ProfileOutlined, BulbOutlined, BookOutlined } from "@ant-design/icons";
// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  BulbOutlined,
  BookOutlined,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const forms = () => {
  return {
    id: "forms",
    title: "Forms",
    type: "group",
    children: [
      {
        id: "student",
        title: "Admissions",
        type: "item",
        url: "/student/add",
        icon: icons.BookOutlined,
      },
      {
        id: "teacher",
        title: "Teacher",
        type: "item",
        url: "/teacher",
        icon: icons.ProfileOutlined,
      },
      {
        id: "class",
        title: "Class",
        type: "item",
        url: "/class",
        icon: icons.LoginOutlined,
      },
      {
        id: "events",
        title: "Events",
        type: "item",
        url: "/events",
        icon: icons.BulbOutlined,
      },
      {
        id: "fees",
        title: "Fees",
        type: "item",
        url: "/fees",
        icon: icons.BulbOutlined,
      },
      {
        id: "test",
        title: "Test",
        type: "item",
        url: "/testform",
        icon: icons.BulbOutlined,
      },
    ],
  };
};

export default forms;
