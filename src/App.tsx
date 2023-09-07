import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes.tsx";

function App() {
  return (
    <div className=" max-w-screen-xl mx-auto">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
