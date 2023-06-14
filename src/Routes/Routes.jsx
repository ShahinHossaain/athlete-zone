import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import Page404 from "../Component/Page404/Page404";
import Instructors from "../Pages/Instructor/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes/Classes";
import DashBoard from "../Layout/DashBoard/DashBoard";
import Enrolled from "../Pages/DashBoard/Student/Enrolled/Enrolled";
import HIstory from "../Pages/DashBoard/Student/History/HIstory";
import MySelectedClasses from "../Pages/DashBoard/Student/MySelectedClasses/MySelectedClasses";
import AddClass from "../Pages/DashBoard/Instructor/AddClass/AddClass";
import PrivateRoute from "../Component/PrivateRoute/PrivateRoute";
import Myclasses from "../Pages/DashBoard/Instructor/MyClasses/Myclasses";
import ManageClasses from "../Pages/DashBoard/Admin/ManageClasses/ManageClasses";
import ManageUser from "../Pages/DashBoard/Admin/ManageUser/ManageUser";
import InstructorClasses from "../Component/InstructorClasses/InstructorClasses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "classes",
        element: <Classes></Classes>,
      },
      {
        path: "InstructorClasses",
        element: <InstructorClasses></InstructorClasses>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "a",
        element: <MySelectedClasses></MySelectedClasses>,
      },
      {
        path: "enrolled",
        element: <Enrolled></Enrolled>,
      },
      {
        path: "history",
        element: <HIstory></HIstory>,
      },
      {
        path: "addClass",
        element: <AddClass></AddClass>,
      },
      {
        path: "myClasses",
        element: <Myclasses></Myclasses>,
      },
      {
        path: "manageClasses",
        element: <ManageClasses></ManageClasses>,
      },
      {
        path: "manageUser",
        element: <ManageUser></ManageUser>,
      },
    ],
  },
  {
    path: "/*",
    element: <Page404></Page404>,
  },
]);
