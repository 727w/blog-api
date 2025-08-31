import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./components/Profile";
import AddPost from "./pages/AddPost";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/post/:id/detail" element={<Detail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/add/post" element={<AddPost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
