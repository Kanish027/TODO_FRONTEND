import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { server } from "../index";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [todo, setTodo] = useState([]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    try {
      const { data } = await axios.post(
        `${server}/tasks/new`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setTitle("");
      setDescription("");
      userTodos();
      setIsLoading((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const userTodos = async () => {
    try {
      const response = await axios.get(`${server}/tasks/all`, {
        withCredentials: true,
      });
      setTodo(response.data.tasks);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    userTodos();
  }, []);

  const handleDeleteTodo = async (id) => {
    setIsDeleteLoading((prev) => !prev);
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      userTodos();
      setIsDeleteLoading((prev) => !prev);
    } catch (error) {
      toast.error("Error");
    }
  };

  const handleIsCompleted = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/tasks/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      userTodos();
    } catch (error) {
      toast.success("Error");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div
          className="col-lg-6 border m-3 px-4 py-4 rounded-2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px" }}
        >
          <h3 className="text-center fw-bold">Add To-Do</h3>
          <form onSubmit={handleAddTodo}>
            <div className="my-3">
              <input
                type="text"
                className="form-control border-dark rounded-1"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="my-3">
              <textarea
                className="form-control border-dark rounded-1"
                rows={"5"}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="d-grid">
              <button disabled={isLoading} className="btn btn-sm btn-dark">
                {isLoading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {todo.map((items) => {
        return (
          <div
            className="row d-flex justify-content-center my-3"
            key={items._id}
          >
            <div
              className="col-lg-6 px-4 py-3 border rounded-1"
              style={{ boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px" }}
            >
              <h4 className="fw-semibold">{items.title}</h4>
              <p className="mb-2">{items.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="isCompleted"
                    className="form-check-input"
                    onChange={() => handleIsCompleted(items._id)}
                    checked={items.isCompleted}
                  />
                  <label htmlFor="isCompleted" className="form-label my-0">
                    Completed
                  </label>
                </div>
                <div>
                  <button
                    onClick={() => handleDeleteTodo(items._id)}
                    className="btn btn-sm btn-dark"
                    disabled={isDeleteLoading}
                  >
                    {isDeleteLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
