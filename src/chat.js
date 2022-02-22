import { Avatar } from "@material-ui/core";
import "./chat.css";
import StopRoundedIcon from "@material-ui/icons/StopRounded"
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { selectImage } from "./features/appSlice";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Chat({id,profilePic,username,timestamp,imageUrl,read}){
  
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const open=()=>{
      if(!read){
          dispatch(selectImage(imageUrl))
          db.collection("posts").doc(id).set(
               {
                  read:true,
              },
              {merge:true}
          );

          navigate("/chats/view");
      }

  }
  
    return (
    <div  onClick={open} className="chat">
      <Avatar src={profilePic} className="chat_avatar"></Avatar>
     <div className="chat_info">

         <h4>{username}</h4>
         <p> {!read && "Tap to view -"}     <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /> </p>
     </div>

     {!read && <StopRoundedIcon className="chat_readIcon"/>}
    </div>
        )
}   