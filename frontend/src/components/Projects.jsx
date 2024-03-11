import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { useSelector } from "react-redux";
import bin from "../assets/bin.png";
import Alert from "./Alert";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");

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

  useEffect(() => {
    const csrfToken = document.cookie.match(/XSRF-TOKEN=(.+);/)[1];
    axiosClient.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    loadProjects();
  }, []);

  const deleteProject = async (projectId) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible."
      )
    ) {
      try {
        await axiosClient.delete(`/projects/${projectId}`, {
          withCredentials: true,
        });
        setAlertType("success");
        setAlertMessage("Projet supprimé avec succès !");
        setShowAlert(true);
        loadProjects();
      } catch (error) {
        setAlertType("danger");
        setAlertMessage("Erreur lors de la suppression du projet.");
        setShowAlert(true);
        console.error(
          `Erreur lors de la suppression du projet : ${error.message}`
        );
      }
    }
  };

  return (
    <div className="container h-screen mx-auto pt-11 p-8 bg-white dark:bg-gray-900 text-white">
      <div className="w-80 mb-2">
        {showAlert && (
          <Alert
            type={alertType}
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        )}
      </div>
      <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
        Tous les projets
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="mb-4 h-300">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden h-60 shadow-md  flex flex-col">
                <div className="p-4 flex-1 overflow-y-auto">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {project.description}
                  </p>
                </div>
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun projet trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
