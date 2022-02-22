import React, { useEffect } from 'react';

import './App.css';
import WebcamCapture from './WebcamCapture';
import {useSelector,useDispatch} from "react-redux";
import {login, logout, selectUser} from "./features/appSlice"
import Login from "./login"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Preview from './Preview';
import Chats from './chats';
import ChatView from './chatView';
import { auth } from './firebase';

function App() {
const dispatch=useDispatch();

useEffect(()=>{
auth.onAuthStateChanged((authUser)=>{

  // console.log(authUser.);
  if(authUser){
    dispatch(login({
      username: authUser.displayName,
      profilePic: authUser.photoURL,
      id: authUser.uid
  }))
  }
  else
  {
    dispatch(logout())
  }
})

})
const user=useSelector(selectUser);


  return (
    <div className="app">

<Router>
{!user ? (<Login/>) : (

<>

<img src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="" className='app__logo' />
<div className="app_body">
 
 <div className="app__bodyBackground">

 <Routes>
 
 <Route exact path="/preview" element={<Preview/>} />
 <Route exact path="/chats" element={<Chats/>} />
 <Route exact path="/chats/view" element={<ChatView/>} />
 <Route exact path="/" element={<WebcamCapture/>} />
 
 </Routes>
 
 </div>

 
 </div>
 </>
 )}

</Router>

   </div>
  );
}

export default App;
