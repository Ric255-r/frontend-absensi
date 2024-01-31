// import { useContext } from "react";
// import { useLocation } from "react-router-dom";
// import { Navigate, Outlet } from "react-router-dom";
// import { UserContext } from "../context/Index";

// const useAuth = () => {
//     const { user } = useContext(UserContext);
//     return user && user.isLogin;
// }

// const ProtectedRoutes = () => {
//     const location = useLocation();
//     const isAuth = useAuth();
//     return isAuth ? (
//         <Outlet />
//     ) : (
//         <Navigate to="/login" replace state={{ from: location }} />
//     )
// }

// export default ProtectedRoutes;