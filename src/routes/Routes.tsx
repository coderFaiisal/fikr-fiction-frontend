import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout";
import Books from "../pages/Books/Books";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import BookDetails from "../pages/BookDetails/BookDetails";
import AddNewBook from "../pages/AddNewBook/AddNewBook";
import PrivateRoute from "./PrivateRoute";
import UpdateBook from "../pages/UpdateBook/UpdateBook";
import WishLists from "../pages/WishLists/WishLists";
import ReadingLists from "../pages/ReadingLists/ReadingLists";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishLists",
        element: (
          <PrivateRoute>
            <WishLists />
          </PrivateRoute>
        ),
      },
      {
        path: "/readingLists",
        element: (
          <PrivateRoute>
            <ReadingLists />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
