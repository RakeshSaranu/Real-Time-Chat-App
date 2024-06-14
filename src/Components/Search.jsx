import React, { useContext, useState } from 'react';
import { db } from '../Firebase';
import { collection, query, where, getDocs,getDoc,doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const {currentUser}=useContext(AuthContext);

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  };

  console.log("Current user is:",currentUser)

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('displayName', '==', username));

    try {
      const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    setUser(doc.data());
    console.log("User found:", doc.data());
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      setError(true);
    }
  };

  const Handleselect = async () => {
  if (!currentUser || !user) {
    console.error('Current user or user is undefined');
    return;
  }

  const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedId), { messages: [] });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId +".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        [combinedId +".date"]: serverTimestamp()
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        },
        [combinedId + '.date']: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error selecting user:', error);
  }
  setUser(null);
  setUsername("")
};


  return (
    <div className='search'>
      <div className='searchform'>
        <input type='text' placeholder='Find a User' onKeyDown={handleKey} value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      {error && <span>User not Found</span>}
      {user && (
        <div className='userchat' onClick={Handleselect}>
          <img src={user.photoURL} alt='' />
          <div className='userchatinfo'>
            <span>{user.displayName}</span>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
