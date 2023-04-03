import React, { useState } from 'react';

function Chatbox(props) {
  console.log(props);
  const {talkObj:{id, text, createdAt}, isOwner} = props; //구조분해 할당
  const [editing, setEditing] = useState(false);

  // 시간변환
  const date = new Date(createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const padNumber = (number) => {
    if(number<10) number = '0' + number;
    return number;
  };

  return (
    <div className="chat_box my" key={id}> 
      <span className='chat'>{text}</span>
      <span className="chat_time">
        <span>{padNumber(hours)}</span>:<span>{padNumber(minutes)}</span>
      </span>
    </div>
  )
}

export default Chatbox;