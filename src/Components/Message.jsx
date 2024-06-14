import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const Message = (props) => { // Change (message) to (props)
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref=useRef();
  const message = props.message; // Access message via props.message
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"});
  },[message]);

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageinfo">
        <img src={
          message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL
        } alt='Avatar' />
        <span>Just Now</span>
      </div>
      <div className="msgcontent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt='image' />}
      </div>
    </div>
  );
}

export default Message;
