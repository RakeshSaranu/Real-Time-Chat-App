import React, { useContext } from 'react'
import Cam from '../Images/cam.png'
import Add from '../Images/add.png'
import More from '../Images/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../Context/ChatContext'
const Chat = () => {
  const {data}=useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatinfo">
        <span>{data.user?.displayName}</span>
        <div className="chaticons">
          <img src={Cam} alt=''></img>
          <img src={Add} alt=''></img>
<img src={More} alt=''></img>
        </div>
      </div>
      <Messages/>
      <Input/>
    
    </div>
  )
}

export default Chat