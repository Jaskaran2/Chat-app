import React,{useEffect,useState} from 'react';
import {useParams} from "react-router-dom";
import "./Chat.css";
import {Avatar,IconButton} from "@material-ui/core";
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import db from "./firebase";
import {useStateValue} from "./StateProvider";
import firebase from "firebase";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Chat(){

  const[seed,setSeed]=useState('');
  const[input,setInput]=useState("");
  const{roomId}=useParams();
  const[roomName,setRoomName]=useState("");
  const[messages,setMessages]=useState([]);
  const[{user},dispatch]=useStateValue();

  const [emoji, setEmoji] = useState(false);
  const addEmoji = (e) => {
      let emoji = e.native;
      setInput(input + emoji);
    };
    const checkEmojiClose = () => {
      if (emoji) {
        setEmoji(false);
      }
    };

//Different routs
  useEffect(()=>{
    if(roomId)
    {
    db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>{
      const data=snapshot.data();
    setRoomName(data.name)
  }
    );
    db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot)=>(
      setMessages(snapshot.docs.map((doc)=>doc.data()))
    ))
  }
},[roomId]);


//Different icons
  useEffect(()=>{
      setSeed(Math.floor(Math.random()*5000));
  },[roomId]);


//Message sender function
  const sendMesssage=(e)=>{
      e.preventDefault();
      console.log(input);

        db.collection('rooms').doc(roomId).collection('messages').add({
          message:input,
          name:user.displayName,
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
      setInput("");
  };

  return (
    <div className="chat">
        <div className="chat__header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
        <p>{new Date(
            messages[messages.length-1]?.
            timestamp?.toDate()
          ).toUTCString}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
        <SearchOutlinedIcon />
    </IconButton>

      <IconButton>
    <AttachFileOutlinedIcon />
    </IconButton>

    <IconButton>
    <MoreVertOutlinedIcon />
    </IconButton>
        </div>
        </div>
              <div className="chat__body">
                  {messages.map((message)=>(
                    <p className={`chat__message ${
                        message.name === user.displayName&&'chat__receiver'}`}>
                      <span className="chat__name">
                      {message.name}
                      </span>
                    {message.message}
                      <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                      </span>

                    </p>
                  ))}
                  </div>

              <div className="chat__footer">
              <IconButton>

                <InsertEmoticonIcon 
                 className="yellow"
                 onClick={() => setEmoji(!emoji)}
                 />
                    {emoji ? <Picker onSelect={addEmoji} /> : null}
                    </IconButton>

              <form>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message"
                  onClick={checkEmojiClose}

                  type="text"
                />
              <button onClick={sendMesssage}
                type="submit">
                  Send a message
                </button>
              </form>
              <MicIcon />
              </div>
              
    </div>);
}

export default Chat;
