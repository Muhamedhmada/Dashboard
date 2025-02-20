// import useNavigate from 'react'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({children}){
  // const nav = Navigate()
  const token = localStorage.getItem("token")
  // return
    // {
      return token?children:<Navigate to="/" />;
    // }
  // )
}
export default ProtectedRoute