import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { server } from "../index";
import toast from "react-hot-toast";
import UserContext from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    refresh,
    setRefresh,
  } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container-fluid my-4">
      <div className="row d-flex justify-content-center my-4">
        <div
          className="col-lg-5 col-md-7 p-5 border  bg-white rounded-3"
          style={{ boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px" }}
        >
          <h3 className="fw-bold mb-4">Sign in to your account</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-2 d-flex justify-content-between">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="rememberme"
                  className="form-check-input"
                  value={""}
                />
                <label htmlFor="rememberme" className="form-label">
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="/"
                  className="link fw-semibold fs-6 text-decoration-none"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="d-grid gap-2 mb-3">
              <button disabled={loading} className="btn btn-primary">
                {loading ? "Logging..." : "Login"}
              </button>
            </div>
            <div>
              <span className="text-secondary fw-light">
                Don't have an account yet?
              </span>{" "}
              <Link to={"/register"} className="text-decoration-none">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
