import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Overlay from "../../components/overlay/Overlay";

function Home() {

    return (
        <>
        <Navbar/>

        <Outlet/>
        
        <Overlay/>
        </>
    );
}

export default Home;
