import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";
import axios from "axios";
import { server } from "./index";

function App() {
  const { user, setUser, setIsAuthenticated, refresh } =
    useContext(UserContext);

  const userProfile = async () => {
    try {
      const response = await axios.get(`${server}/users/profile`, {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setUser(response.data.user);
      console.log(response.data.user);
    } catch (error) {
      console.log(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    console.log("Mounted");
    userProfile();
  }, [refresh]);

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
