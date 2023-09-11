import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes.tsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className=" max-w-screen-xl mx-auto">
      <RouterProvider router={routes} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
