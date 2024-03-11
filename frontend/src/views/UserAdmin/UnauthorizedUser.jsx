import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";

function UnauthorizedUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const fadeAnim = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/UnauthorizedUsers");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  const onAddAuthClick = async (user) => {
    try {
      const formData = {
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role,
      };

      await axiosClient.post("/users", formData);
      await axiosClient.delete(`/UnauthorizedUsers/${user.id}`);
      setNotification("User was successfully authorized");
      getUsers(); // Refresh the list
      navigate(".", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error authorizing user:", error);
      setNotification("Error authorizing user"); // Notify user of error
    }
  };

  // Fetch unauthorized users on component mount
  useEffect(() => {
    getUsers();
  }, []);
  const onDeleteClick = async (user) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosClient.delete(`/UnauthorizedUsers/${user.id}`);
        setNotification("User was successfully deleted");
        getUsers();
        navigate(".", { replace: true });
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full mb-10">
      <h1 className="text-2xl pl-4 font-bold ">Unauthorized users</h1>
      <div className="user-table mt-6 card animated fadeInDown">
        <table className="w-full border shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="text-left px-4 py-2 font-medium tracking-wider bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                ID
              </th>
              <th className="text-left px-4 py-2 font-medium tracking-wider bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                Name
              </th>
              <th className="text-left px-4 py-2 font-medium tracking-wider bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                Email
              </th>
              <th className="text-left px-4 py-2 font-medium tracking-wider bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                Department
              </th>
              <th className="text-left px-4 py-2 font-medium tracking-wider bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                Role
              </th>
              <th className="text-left px-4 py-2 font-medium tracking-wider bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                Create Date
              </th>
              <th className="text-left px-4 py-2 font-medium tracking-wider bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="text-center">
                <td colSpan="7">Loading...</td>
              </tr>
            ) : (
              users.map((u) => (
                <animated.tr
                  key={u.id}
                  style={fadeAnim}
                  className="hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2">{u.id}</td>
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.department}</td>
                  <td className="px-4 py-2">{u.role}</td>
                  <td className="px-4 py-2">{u.created_at}</td>
                  <td className="px-4 py-2">
                    <button
                      className="btn-add-auth bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2"
                      onClick={() => onAddAuthClick(u)}
                    >
                      Add Auth
                    </button>
                    <button
                      className="btn-delete bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2"
                      onClick={() => onDeleteClick(u)}
                    >
                      Delete
                    </button>
                  </td>
                </animated.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UnauthorizedUser;
