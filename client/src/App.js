import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import SeparatePost from "./pages/SeparatePost";
import EditPost from "./components/profile/EditPost";
import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";
import AuthPrivateRoute from "./components/AuthPrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
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
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
