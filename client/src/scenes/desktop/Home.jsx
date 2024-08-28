import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Home() {

    return (
        <>
        <Navbar/>

        <Outlet/>
        </>
    );
}

export default Home;
