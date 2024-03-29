import React,{useState,useEffect} from 'react';
import "./Sidebar.css";
import {Avatar} from "@material-ui/core";

import SidebarChat from "./SidebarChat";
import db from "./firebase";
import {useStateValue} from "./StateProvider";

function Sidebar(){

  const[rooms,setRooms]=useState([]);
  const[{user}]=useStateValue();

  useEffect(()=>{
    db.collection('rooms').onSnapshot((snapshot) =>
    setRooms(
      snapshot.docs.map((doc)=>({
          id:doc.id,
          data:doc.data()
        }))
      )
    );
  },[]);

  return (
    <div className="sidebar">
  <div className="sidebar__header">
    <Avatar src={user?.photoURL} />
      <div className="sidebar__headerRight">
            {user.displayName}

  </div>
      </div>

        

          <div className="sidebar__chats">
            <SidebarChat addNewChat />
              {rooms.map((room)=>(
                <SidebarChat key={room.id} id={room.id}
                  name={room.data.name} />
              ))}
          </div>

    </div>);
}

export default Sidebar;
