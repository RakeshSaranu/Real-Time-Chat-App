import React, { useState } from 'react';
import Add from '../Images/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          setError(true);
          setLoading(false); // Set loading to false if there's an error
          console.error('Error uploading file:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            setLoading(false); // Set loading to false when navigation is about to happen
            navigate("/");
          });
        }
      );
    } catch (error) {
      setError(true);
      setLoading(false); // Set loading to false if there's an error
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formwrapper'>
        <span className='logo'>MESSENGER</span>
        <span className='title'>REGISTER</span>
        <form onSubmit={submitHandler}>
          <input type='text' placeholder='UserName'></input>
          <input type='email' placeholder='Email'></input>
          <input type='password' placeholder='Password'></input>
          <input style={{ display: 'none' }} type='file' id='file'></input>
          <label htmlFor='file'>
            <img src={Add} alt='Add Img Icon'></img>
            <span>Add an Avatar</span>
          </label>
          <button type='submit'>SIGN UP</button>
          {loading && <span>Loading...</span>} {/* Display loading message */}
          {error && <span>Something went wrong</span>}
        </form>
        <p>Do you have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
