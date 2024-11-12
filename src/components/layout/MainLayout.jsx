import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import React from "react";

const MainLayout = () => {
    return (
        <div className="w-full h-screen">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
