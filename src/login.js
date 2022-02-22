import "./login.css"
import {Button} from "@material-ui/core";
import {auth,provider} from "./firebase";
import {login} from "./features/appSlice";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function Login(){

const dispatch = useDispatch();
const navigate = useNavigate();

    const signIn=()=>{
auth.signInWithRedirect(provider,"http://localhost:3000") //(provider)
.then((result)=>{
    console.log(result);
    dispatch(login({
        username: result.user.displayName,
        profilePic: result.user.photoURL,
        id: result.user.uid
    }))

    
})
.catch((error)=>{
alert(error.message)
})
};
// navigate('/', { replace: false })
// console.log("running")

return (<div> 

    <div className="login_container">
        <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
         <Button variant="outlined" 
         onClick={signIn} 
         >
             Sign In
             </Button>
    </div>
</div>)

}