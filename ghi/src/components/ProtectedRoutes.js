import { Outlet, Navigate } from 'react-router-dom'
import ErrorMessage from './ErrorMessage';

function ProtectedRoutes() {

  let isAuthenticated = localStorage.getItem("leadsToken");

  return (

    isAuthenticated !== "true" ? <Navigate to="/login"/> : <Outlet/>
  )
}



// const ProtectedRoutes = () => {
//   let auth = {'token': false}
//   return (
//     auth.token ? <Outlet/> : <Navigate to="/login"/>
//   )
// }

export default ProtectedRoutes;
