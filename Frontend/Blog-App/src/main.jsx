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
import { AuthProvider } from "./Components/AuthContext.jsx";
import Profile from "./Components/ProfilePage/Profile.jsx";
import Contact from "./Components/Contact/Contact.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Intro screen */}
      <Route index element={<Intro />} />
      {/* Home Route */}
      <Route path="home" element={<Post />} />
      <Route path="about" element={<h1>About Page</h1>} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile/:id" element={<Profile />} />
      <Route path="contact" element={<Contact />} />


    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
