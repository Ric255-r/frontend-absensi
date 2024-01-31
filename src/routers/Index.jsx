// import { createBrowserRouter, Navigate } from "react-router-dom";
// import LayoutRoot from "../layouts/RootLayout";
// import Homepage from "../pages/Index";
// import Tentang from "../pages/About";
// import { getApi } from "../apis/loader";
// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
// import AuthLayout from "../layouts/AuthLayout";
// import { UserContext } from "../context/Index";
// import { useContext, useEffect, useState } from "react";

// // let BuatLogin = false;

// export const loginwoi = () => {
//     return useContext(UserContext);

// }

// export const router = createBrowserRouter([
//     {
//         path: '/',
//         element: loginwoi ? <Navigate to="/home" /> : <AuthLayout />,
//         children: !loginwoi && [
//             {
//                 path: '/',
//                 element: <Login /> 
//             },
//             {
//                 path: '/register',
//                 element: <Register />
//             }
//         ] 
//     },
//     {
//         path: '/home',
//         element: <LayoutRoot />,
//         children: [
//             {
//                 path: '/home',
//                 element: <Homepage />,
//                 loader: getApi
//             },
//             {
//                 path: '/home/about',
//                 element: <Tentang />
//             }
//         ]
//     }
// ]);