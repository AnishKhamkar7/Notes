import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/Routes/PrivateRoutes";
import PublicRoute from "./components/Routes/PublicRoutes";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="login/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
