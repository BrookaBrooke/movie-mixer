import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  let isAuthenticated = localStorage.getItem("leadsToken");
  return isAuthenticated !== "null" ? <Outlet /> : <Navigate to="/login" />;
}

// const ProtectedRoutes = () => {
//   let auth = {'token': false}
//   return (
//     auth.token ? <Outlet/> : <Navigate to="/login"/>
//   )
// }

export default ProtectedRoutes;
