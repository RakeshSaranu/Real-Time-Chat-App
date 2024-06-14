import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../Firebase';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const {dispatch}=useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        console.log(Object.entries(chats));
      });

      return () => {
        unsub(); // Clean up function
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const HandleSelect=(userInformation)=>{
    dispatch({type:"CHANGE_USER",payload:userInformation})
  }

  return (
    <div className='chats'>
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat) => {  //Object.entries(chat) makes the chat objects as arrays.
        return (
          <div className='userchat' key={chat[0]} onClick={()=>HandleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt='' />
            <div className='userchatinfo'>
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].LastMessage?.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
