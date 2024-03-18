import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import("pages/dashboard")));

// render - sample page
const SamplePage = Loadable(lazy(() => import("pages/extra-pages/SamplePage")));

// render - utilities
const Typography = Loadable(lazy(() => import("pages/components-overview/Typography")));
const Users = Loadable(lazy(() => import("pages/users")));

const Class = Loadable(lazy(() => import("pages/class")));
const ClassAdd = Loadable(lazy(() => import("pages/class/form")));
const ClassEdit = Loadable(lazy(() => import("pages/class/editForm")));

const Student = Loadable(lazy(() => import("pages/student")));
const StudentAdd = Loadable(lazy(() => import("pages/student/form")));
const StudentEdit = Loadable(lazy(() => import("pages/student/editForm")));

const Teacher = Loadable(lazy(() => import("pages/teacher")));
const TeacherAdd = Loadable(lazy(() => import("pages/teacher/form")));
const TeacherEdit = Loadable(lazy(() => import("pages/teacher/editForm")));

const Events = Loadable(lazy(() => import("pages/events")));
const EventsAdd = Loadable(lazy(() => import("pages/events/form")));
const Categories = Loadable(lazy(() => import("pages/events/categories")));
const CategoriesAdd = Loadable(lazy(() => import("pages/events/categoryForm")));
const EventsPrograms = Loadable(lazy(() => import("pages/events/eventPrograms")));
const EventsAddMark = Loadable(lazy(() => import("pages/events/rankForm")));

const Exam = Loadable(lazy(() => import("pages/exam")));
const ExamAdd = Loadable(lazy(() => import("pages/exam/form")));
const ExamEdit = Loadable(lazy(() => import("pages/exam/editForm")));
const ExamMarks = Loadable(lazy(() => import("pages/exam/examMarks")));
const ExamMarksAdd = Loadable(lazy(() => import("pages/exam/markForm")));

const HomeWork = Loadable(lazy(() => import("pages/homework")));
const HomeWorkAdd = Loadable(lazy(() => import("pages/homework/form")));
const HomeWorkEdit = Loadable(lazy(() => import("pages/homework/editForm")));

const Fees = Loadable(lazy(() => import("pages/fees")));
const FeesAdd = Loadable(lazy(() => import("pages/fees/form")));

const Color = Loadable(lazy(() => import("pages/components-overview/Color")));
const Test = Loadable(lazy(() => import("pages/testForm")));
const Shadow = Loadable(lazy(() => import("pages/components-overview/Shadow")));
const AntIcons = Loadable(lazy(() => import("pages/components-overview/AntIcons")));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = () => {
  return {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DashboardDefault />,
      },
      {
        path: "color",
        element: <Color />,
      },
      {
        path: "dashboard",
        children: [
          {
            path: "default",
            element: <DashboardDefault />,
          },
        ],
      },
      {
        path: "sample-page",
        element: <SamplePage />,
      },
      {
        path: "class",
        element: <Class />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "class/add",
        element: <ClassAdd />,
      },
      {
        path: "class/:id/edit",
        element: <ClassEdit />,
      },
      {
        path: "class/:id/homework",
        element: <HomeWork />,
      },
      {
        path: "class/:classId/homework/add",
        element: <HomeWorkAdd />,
      },
      {
        path: "homework/:id/edit",
        element: <HomeWorkEdit />,
      },
      {
        path: "class/:id/exam",
        element: <Exam />,
      },
      {
        path: "class/:id/exam/add",
        element: <ExamAdd />,
      },
      {
        path: "class/:classId/exam/:id/edit",
        element: <ExamEdit />,
      },
      {
        path: "class/:classId/student/:id/marks",
        element: <ExamMarks />,
      },
      {
        path: "class/:classId/student/:id/marks/add",
        element: <ExamMarksAdd />,
      },

      {
        path: "teacher",
        element: <Teacher />,
      },
      {
        path: "teacher/add",
        element: <TeacherAdd />,
      },
      {
        path: "teacher/:id/edit",
        element: <TeacherEdit />,
      },
      {
        path: "fees",
        element: <Fees />,
      },
      {
        path: "fees/student/:id",
        element: <FeesAdd />,
      },
      {
        path: "class/:classId/student",
        element: <Student />,
      },
      {
        path: "student/add",
        element: <StudentAdd />,
      },
      {
        path: "student/:id/edit",
        element: <StudentEdit />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "events/add",
        element: <EventsAdd />,
      },
      {
        path: "events/categories",
        element: <Categories />,
      },
      {
        path: "events/categories/add",
        element: <CategoriesAdd />,
      },
      {
        path: "events/:id",
        element: <EventsPrograms />,
      },
      {
        path: "events/:eventId/program/:programId/rank",
        element: <EventsAddMark />,
      },
      {
        path: "shadow",
        element: <Shadow />,
      },
      {
        path: "testform",
        element: <Test />,
      },
      {
        path: "typography",
        element: <Typography />,
      },
      {
        path: "icons/ant",
        element: <AntIcons />,
      },
    ],
  };
};

export default MainRoutes;
