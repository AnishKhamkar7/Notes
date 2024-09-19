import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="dashboard" element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login/" element={<Login />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
