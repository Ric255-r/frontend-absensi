import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
function AuthLayout(){
    return (
        <>
            <div>Ini Adalah Root dari Auth layout</div>
            <Link to="/">Login</Link> | <Link to="/register">Register</Link>

            <Outlet></Outlet>
        </>
    )
}

export default AuthLayout;