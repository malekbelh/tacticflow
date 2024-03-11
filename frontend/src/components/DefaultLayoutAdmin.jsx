import React from "react";
import { Outlet } from "react-router-dom";

function DefaultLayoutAdmin() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default DefaultLayoutAdmin;
