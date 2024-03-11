import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import closeicon from "../assets/close.png";
import { useDispatch } from "react-redux";
import boardSlices from "../redux/boardSlice";
import axiosClient from "../axios-client.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
function AddEditBoardModal({ setBoardModalOpen, type, affiche, setAffiche }) {
  const dispatch = useDispatch();
  const [deadline, setDeadline] = useState(null);
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);

  const [projects, setProjects] = useState([]);
  const [newProjectData, setNewProjectData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const csrfToken = document.cookie.match(/XSRF-TOKEN=(.+);/)[1];
    axiosClient.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    loadProjects();
  }, []);
  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onsubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardSlices.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardSlices.actions.editBoard({ name, newColumns }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateProjectData(newProjectData);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosClient.post("/projects", newProjectData, {
        withCredentials: true,
      });
      console.log("Projet ajouté avec succès :", response.data);

      // Reload the window after successfully adding a project
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error("Internal server error:", error.response.data);
      } else {
        console.error("Error adding project:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const validateProjectData = (data) => {
    const errors = {};

    if (!data.title) {
      errors.title = "Le titre est obligatoire";
    }

    if (!data.description) {
      errors.description = "La description est obligatoire";
    }

    return errors;
  };
  const loadProjects = async () => {
    try {
      const response = await axiosClient.get("/projects", {
        headers: {
          "X-CSRF-TOKEN": axiosClient.defaults.headers.common["X-CSRF-TOKEN"],
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des projets :", error);
    }
  };
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
      className="fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080] scrollbar-hide"
    >
      {/* Modal Section */}
      <form onSubmit={handleSubmit}>
        <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-gray-900 text-black dark:text-white font-bold shadow-md shadow-gray-600 max-w-md mx-auto w-full px-8 py-8 rounded-xl">
          <h3 className="text-lg">
            {type === "edit" ? "Edit" : "Add New"} Board
          </h3>

          {/* Task Name */}
          <div className=" mt-8 flex flex-col space-y-3">
            <label className="text-sm dark:text-white text-gray-500">
              Project title
            </label>
            <input
              type="text"
              name="title"
              value={newProjectData.title}
              onChange={(e) =>
                setNewProjectData({
                  ...newProjectData,
                  title: e.target.value,
                })
              }
              className="bg-transparent outline-none px-4 py-2 rounded-md text-sm border  border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
              id="board-name-input"
            />
            <label className="text-sm dark:text-white text-gray-500">
              Project Descp
            </label>
            <input
              type="text"
              name="description"
              value={newProjectData.description}
              onChange={(e) =>
                setNewProjectData({
                  ...newProjectData,
                  description: e.target.value,
                })
              }
              className="bg-transparent outline-none px-4 py-2 rounded-md text-sm border  border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
              id="board-name-input"
            />
          </div>
          {/* Deadline */}
          <div className="mt-8 flex flex-col space-y-3">
            <label className="text-sm dark:text-white text-gray-500">
              Deadline
            </label>
            <div className="flex items-center space-x-3">
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="bg-transparent outline-none px-4 py-2 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
              />
            </div>
          </div>
          {/* Board Columns */}
          <div
            className=" 
      mt-8 flex flex-col space-y-3 
      "
          >
            <label className=" text-sm dark:text-white text-gray-500">
              Board Columns
            </label>

            {newColumns.map((column, index) => (
              <div key={index} className="flex items-center w-full">
                <input
                  className="bg-transparent flex-grow px-4 py-2 rounded-md
                text-sm border border-gray-600 outline-none focus:outline-[#735fc7]
                "
                  onChange={(e) => {
                    onChange(column.id, e.target.value);
                  }}
                  value={column.name}
                  type="text"
                />
                <img
                  onClick={() => {
                    onDelete(column.id);
                  }}
                  className="cursor-pointer m-4 h-4"
                  src={closeicon}
                  alt="closeicon"
                />
              </div>
            ))}
          </div>
          <div>
            <button
              className="w-full items-center hover:opacity-75 dark:text-midnightblue
          dark:bg-white text-white mt-2 py-2  bg-midnightblue rounded-full
          "
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", task: [], id: uuidv4() },
                ]);
              }}
            >
              + Add new column
            </button>
            <button
              className="w-full items-center  hover:opacity-75 dark:text-white 
          dark:  mt-8 relative text-white bg-midnightblue py-2 rounded-full
          "
              onClick={() => {
                const isValid = validate();
                if (isValid === true) onsubmit(type);
              }}
              type="submit"
            >
              {type === "add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEditBoardModal;
