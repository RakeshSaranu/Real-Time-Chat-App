import './Styles.scss'
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {
  const {currentUser}=useContext(AuthContext);
  console.log(currentUser)

  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return <Navigate to="/login"></Navigate>
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
