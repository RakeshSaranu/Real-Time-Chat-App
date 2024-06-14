import React, { useContext, useState } from 'react'
import image from '../Images/img.png'
import Attach from '../Images/attach.png'
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { Timestamp, arrayUnion, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import {v4 as uuid} from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc } from 'firebase/firestore';
const Input = () => {
  const [text,setText]=useState("");
  const [file,setFile]=useState(null);

  const {currentUser}=useContext(AuthContext);
  const {data}=useContext(ChatContext);

  const Handler=async ()=>{
    if(file){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          setError(true);
          console.error('Error uploading file:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId),{
      messages:arrayUnion({
      id:uuid(),
      text,
      senderId:currentUser.uid,
      date:Timestamp.now(),
      img:downloadURL,
              })
            })
           
          });
        }
      );
    }
    else{
      await updateDoc(doc(db,"chats",data.chatId),{
messages:arrayUnion({
id:uuid(),
text,
senderId:currentUser.uid,
date:Timestamp.now(),
        })
      })
    }

 setFile(null);
setText("");

await updateDoc(doc(db,"userChats",currentUser.uid),{
  [data.chatId+ ".LastMessage"]:{
    text
  },
  [data.chatId+".date"]:serverTimestamp()
})

await updateDoc(doc(db,"userChats",data.user.uid),{
  [data.chatId+ ".LastMessage"]:{
    text
  },
  [data.chatId+".date"]:serverTimestamp()
})

  };
  

  return (
    <div className='Input'>
      <input placeholder='Type your text...' type='text' value={text} onChange={e=>setText(e.target.value)}></input>
      <div className='send'>
        <img src={Attach} alt=''></img>
        <input type='file' style={{display:'none'}} id='file' onChange={e=>setFile(e.target.files)}></input>
        <label htmlFor='file'>
          <img src={image} alt=''></img>
        </label>
        <button onClick={Handler}>Send</button>
      </div>
    </div>
  )
}

export default Input