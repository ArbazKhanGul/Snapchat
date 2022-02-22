import { useEffect } from "react";
import { useSelector } from "react-redux"
import { selectCameraImage } from "./features/cameraSlice"
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import "./Preview.css"
import { resetCameraImage } from "./features/cameraSlice";

import CloseIcon from '@material-ui/icons/Close';
import  TextFieldIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import {v4 as uuid} from "uuid";
import {storage,db} from "./firebase"
import firebase from 'firebase/compat/app';
import { selectUser } from "./features/appSlice";


export default function Preview() {
const cameraImage=useSelector(selectCameraImage);
const navigate = useNavigate();
const dispatch=useDispatch();
const user=useSelector(selectUser);

useEffect(()=>{
// console.log(user);
    if(!cameraImage){
        navigate('/', { replace: false })
    }
},[cameraImage,navigate])

const sendPost=()=>{
const id=uuid();
const uploadTask=storage.ref(`posts/${id}`).putString(cameraImage,"data_url");

//in null we can use ssnapshot to get progress of upload
uploadTask.on("state_changed",null,(error)=>{
    console.log(error)
},()=>{
    storage
     .ref("posts")
     .child(id)
     .getDownloadURL()
     .then((url)=>{
         db.collection("posts").add({
             imageUrl:url,
             username:user.username,
             profilePic:user.profilePic,
             read:false,
             timestamp:firebase.firestore.FieldValue.serverTimestamp()

         })
       navigate("/chats");  
     })
})
}

const closePreview=()=>{
dispatch(resetCameraImage());
}

return <div className="preview">

<CloseIcon className="preview_close" onClick={closePreview}/>

<div className="preview_toolbarRight">
<TextFieldIcon/>
<CreateIcon/>
<NoteIcon/>
<MusicNoteIcon/>
<AttachFileIcon/>
<CropIcon/>
<TimerIcon/>


</div>
<img src={cameraImage} alt="Preview" />

<div className="preview_footer" onClick={sendPost}>
<h2>Send Now</h2>
<SendIcon fontSize="small" className="preview__sendIcon" />

</div>
    </div>
}