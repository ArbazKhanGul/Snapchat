import { Avatar } from "@material-ui/core";
import "./chats.css";
import SearchIcon from "@material-ui/icons/Search"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import Chat from "./chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useNavigate } from "react-router-dom";
import {resetCameraImage}  from "./features/cameraSlice"
export default function Chats(){
   
   
   const [posts,setposts]=useState([]);
   const user=useSelector(selectUser);
   const navigate = useNavigate();
   const dispatch=useDispatch();    
   useEffect(()=>{
db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot=>{
    setposts(snapshot.docs.map((doc)=>({
        id:doc.id,
        data:doc.data()
    })))
})
   },[])

const takesnap=()=>{
 dispatch(resetCameraImage())
    navigate("/")   
}

    return(
    <div className="chats">
        
<div className="chats_header">

    <Avatar src={user.profilePic}  onClick={() =>{auth.signOut()}} className="chats_avatar"/>
<div className="chats_search">

    <SearchIcon style={{color:"white",fontSize:"13px !important"}}/>
    <input type="text" placeholder="Friends" />
</div>
<ChatBubbleIcon className="chats_chatIcon" style={{color:"white",fontSize:"13px !important"}}></ChatBubbleIcon>
</div>

<div className="chats_posts">
           {posts.map(({id,data:{profilePic,username,timestamp,imageUrl,read}})=>(<Chat
           key={id}
           id={id}
           username={username}
           timestamp={timestamp}
           imageUrl={imageUrl}
           read={read}
        profilePic={profilePic}
           />))}
</div>
<RadioButtonUncheckedIcon

className="chats__takePicIcon"
onClick={takesnap}
fontSize="large"
/>
        </div>)
}