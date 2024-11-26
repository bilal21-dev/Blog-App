import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Intro from "./Components/Intro.jsx";
import Login from "./Components/Register/Login.jsx";
import SignUp from "./Components/Register/Signup.jsx";
import Post from "./Components/Home/Post.jsx";
import Layout from "./Layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/*(intro screen) */}
      <Route index element={<Intro />} />
      {/* other routes */}
      <Route path="home" element={<Post />} />
      <Route path="about" element={<h1>Hi</h1>} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Route>  
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
