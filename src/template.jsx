import React from "react";
import { Outlet } from "react-router";
import Navbar from "./assets/components/Navbar.jsx";

export default function Template() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Outlet />
        </div>
    );
}