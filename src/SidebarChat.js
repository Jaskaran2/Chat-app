import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { Link } from "react-router-dom";
import { password } from "./constants";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const deleteRoom = () => {
    const passwordVerify = prompt("Enter Admin Password to delete Room");
    if (passwordVerify === password) {
      db.collection("rooms")
        .doc(id)
        .delete()
        .then(function () {
          window.location = "/";
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    } else {
      alert("You are not authorised to delete rooms");
    }
  };

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      //db stuff
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <div className="sidebarChat">
      <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

          <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </Link>
      <div className="sidebarChat__delete" onClick={deleteRoom}>
        <DeleteForeverIcon />
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
