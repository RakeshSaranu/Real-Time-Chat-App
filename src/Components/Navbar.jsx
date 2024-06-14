import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const Navbar = () => {
  const {currentUser}=useContext(AuthContext);
  return (
    <div className='navbar'>
      <span className="logo">Messenger</span>
      <div className="user">
        <img src={currentUser.photoURL} alt=''/>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar