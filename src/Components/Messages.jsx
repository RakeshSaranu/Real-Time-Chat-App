import React, { useContext, useEffect,useState } from 'react';
import Message from './Message';
import { ChatContext } from '../Context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  

  console.log(data.chatId);
  useEffect(() => {
    if (!data.chatId) return; 
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages || []); 
        console.log("DONE")
      } else {
        setMessages([]);
        console.log("No such document!");
      }
    }, (error) => {
      console.error("Error fetching document:", error);
    });
    console.log(messages); 
    console.log(messages.length)
  
    return () => unsub();
  }, [data.chatId]); 
  
  
  return (

    <div className='messages'>
      {messages.length > 0 ? (
        messages.map((m) => (
          <Message message={m} key={m.id} />
        ))
      ) : messages.length === 0 ? (
        <p>Select an user to chat...</p> // Display loading message
      ) : (
        <p>No messages yet...</p> // Display for empty array after fetch
      )}
    </div>
  );
  
}

export default Messages;
