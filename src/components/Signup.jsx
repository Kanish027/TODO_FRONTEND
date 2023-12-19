import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { server } from '../index'
import toast from "react-hot-toast";
import UserContext from "../context/UserContext";

const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const {isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(UserContext)

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser(name, email, password);
  }

  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/users/new`, {
        name: name,
        email: email,
        password: password
      },{
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
      )
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
        toast.error(error.response.data.message);
        setIsAuthenticated(false);
        setLoading(false);
    }
  }

  if(isAuthenticated) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="container-fluid my-4">
      <div className="row d-flex justify-content-center my-4">
        <div className="col-lg-5 col-md-7 p-5 border  bg-white rounded-3" style={{ boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px" }} >
          <h3 className="fw-bold mb-4 text-center">Sign up</h3>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" id="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className="d-grid gap-2 mt-4 mb-3">
              {/* {loading ? <button disabled className="btn btn-primary">Signing</button> : <button className="btn btn-primary">Register</button>} */}
              <button disabled={loading} className="btn btn-primary">{loading ? "Registering..." : "Register"}</button>
            </div>
            <div>
              <span className="text-secondary fw-light">Already have an account?</span>{" "}
              <Link to={"/login"} className="text-decoration-none">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
