import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notestate from "./context/note/noteState";
import LoadingBar from 'react-top-loading-bar'
import Profile from "./components/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [progress, setprogress] = useState(0)
  const [loading, setloading] = useState(false)

  let showalert = (type,msg) => {
    let customId='custom-id-yes'
    if (type === "success") {
      // toast.loading("hello")
      toast.success(msg,{
        toastId: customId,
      });

    }
     else if (type === "warning") {
      toast.warn(msg,{
        toastId: customId,
      });
    }  
    else if (type === "error") {
      toast.error(msg);
    }
  }
  let setloader= (p)=>{
      setprogress(p)
  }
  return (
    <>
    
    <LoadingBar color='#f11946' height={3} progress={progress} onLoaderFinished={()=>{setprogress(0)}}></LoadingBar>
    <Notestate alert={showalert}>
    <Router>
    <Navbar loading={setloader}/>

    <Routes>
    <Route path="/" element={<Home alert={showalert} loading={setloader}/>}/>
    <Route path="/login" element={<Login alert={showalert} loading={setloader}/>}/>
    <Route path="/signup" element={<Signup alert={showalert} loading={setloader}/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/profile" element={<Profile/>}/>
    </Routes>

    </Router>
    <ToastContainer
        position="bottom-right"
        pauseOnHover
        closeOnClick
        // limit={1}
        // pauseOnFocusLoss
        autoClose={2000}
      />
    </Notestate>
    </>
  );
}

export default App;
