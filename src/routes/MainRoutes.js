import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Events = Loadable(lazy(() => import('pages/events')));
const Student = Loadable(lazy(() => import('pages/student')));
const StudentAdd = Loadable(lazy(() => import('pages/student/form')));
const Teacher = Loadable(lazy(() => import('pages/teacher')));
const TeacherAdd = Loadable(lazy(() => import('pages/teacher/form')));
const Class = Loadable(lazy(() => import('pages/class')));
const ClassAdd = Loadable(lazy(() => import('pages/class/form')));
const Exam = Loadable(lazy(() => import('pages/exam')));
const ExamAdd = Loadable(lazy(() => import('pages/exam/examTimetableForm')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const HomeWork = Loadable(lazy(() => import('pages/homework')));
const HomeWorkAdd = Loadable(lazy(() => import('pages/homework/form')));
const Fees = Loadable(lazy(() => import('pages/fees')));
const FeesAdd = Loadable(lazy(() => import('pages/fees/form')));
const ExamMarks = Loadable(lazy(() => import('pages/exam/markForm')));
const Test = Loadable(lazy(() => import('pages/testForm')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'class',
      element: <Class />
    },
    {
      path: 'class/add',
      element: <ClassAdd />
    },
    {
      path: 'homework',
      element: <HomeWork />
    },
    {
      path: 'homework/add',
      element: <HomeWorkAdd />
    },
    {
      path: 'exam',
      element: <Exam />
    },
    {
      path: 'exam/marks',
      element: <ExamMarks />
    },
    {
      path: 'exam/add',
      element: <ExamAdd />
    },
    {
      path: 'teacher',
      element: <Teacher />
    },
    {
      path: 'teacher/add',
      element: <TeacherAdd />
    },
    {
      path: 'fees',
      element: <Fees />
    },
    {
      path: 'fees/add',
      element: <FeesAdd />
    },
    {
      path: 'student',
      element: <Student />
    },
    {
      path: 'student/add',
      element: <StudentAdd />
    },
    {
      path: 'events',
      element: <Events />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'testform',
      element: <Test />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
