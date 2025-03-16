import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import {Toaster} from "react-hot-toast"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import SeparatePost from "./pages/SeparatePost";
import EditPost from "./components/profile/EditPost";
import Footer from "./components/Footer";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";
import AuthPrivateRoute from "./components/AuthPrivateRoute";
import Loader from "./components/Loader";

const Homepage =  lazy(() => import("./pages/Homepage"));
const Blogs = lazy(() => import("./pages/Blogs"))



function App() {
  return (
    <Router>

      <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Default styles for light and dark mode
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '16px',
            borderRadius: '8px',
            padding: '12px',
          },
          duration: 4000,
          success: {
            style: {
              background: '#22c55e',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
      </div>
      <Navbar />
      <Routes>
       
        <Route path="/" element={<Suspense fallback={<Loader />}>
          <Homepage />
        </Suspense>} />
        <Route element={<AuthPrivateRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
        <Route path="/post/:id" element={<SeparatePost />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Suspense fallback={<Loader />}><Blogs /></Suspense>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
