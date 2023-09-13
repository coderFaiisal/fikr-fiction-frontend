import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes.tsx";
import { Toaster } from "react-hot-toast";
import useAuthCheck from "./hooks/useAuthCheck.tsx";
import Loading from "./components/Loading.tsx";

function App() {
  const authChecked = useAuthCheck();

  if (!authChecked) return <Loading />;
  return (
    <div className=" max-w-screen-xl mx-auto">
      <RouterProvider router={routes} />
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
}

export default App;
