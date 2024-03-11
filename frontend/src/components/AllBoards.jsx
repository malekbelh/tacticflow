import { React, useState } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import logo2 from "../assets/logo2.png";
import iconDown from "../assets/arrowdown.png";
import iconUp from "../assets/arrowup.png";
import HeaderDropdown from "./HeaderDropdown.jsx";
import AddEditBoardModal from "../modals/AddEditBoardModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal.jsx";

import boardSlices from "../redux/boardSlice";

function AllBoards({ type }) {
  const [boardType, setBoardType] = useState("add");
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  return (
    <div>
      <div className="  flex flex-col items-start justify-start bg-white dark:bg-slate-900  text-white  w-screen h-screen bg-red">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
          All boards ({boards?.length})
        </h3>

        <div className="flex gap-10  items-center flex-wrap  px-10">
          {boards.map((board, index) => (
            <div
              className="flex w-60  h-40  justify-center cursor-pointer  bg-midnightblue   rounded-3xl  items-center space-x-2  py-4 "
              key={index}
              // onClick={()=>{
              //         dispatch(boardsSlice.actions.setBoardActive({index}))
              // }}
            >
              {/* <img src={boardicon} className='h-6'/> */}
              <p className="text-lg  font-bold ">{board.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllBoards;
