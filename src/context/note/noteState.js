import React, { useState} from "react";
import NoteContext from "./noteContext";

export default function Notestate(props) {
  let initialState = [
    {
      _id: "6499cdfbb1b83bceea5d9e7a",
      title: "Computer Networks",
      description: "It contains all the basics of networks...",
      tag: "networking",
      Date: "2023-06-26T17:42:19.611Z",
      __v: 0,
    }
  ];

  const [notes, setNotes] = useState(initialState);
  const [user, setuser] = useState({"_id": "","name": "","email": "","__v": 0})
  let host = "http://localhost:5000";

  // function to fecthing notes using API Calls //
  let fetchNotes = async () => {
    // api call//
    const res = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
    });
    let data = await res.json();
    setNotes(data);
    getuser()
  };

  // function to add notes//
  let addNote = async (title, description, tag) => {
    // API Call by using fetch command //
   let res= await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag }),
    });
    if(res){
      props.alert('success',"Added Successfully!")
    }
    setTimeout(fetchNotes, 1000);
  };

  // function to delete a note //
  let deleteNote = async (id) => {
    // API Call by using fetch command //
    const res=await fetch(`${host}/api/notes/deletenote`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ id }),
    });
    if(res){
      props.alert('success',"Deleted Successfully!")
    }
    setTimeout(fetchNotes, 1000);
    // console.log("deleted a node with id",id);
    // const newNotes= notes.filter((n)=>{return n._id!==id;})
  };

  // function to update notes//
  let updateNote = async (id, title, description, tag) => {
    // API Call by using fetch command //
    const res=await fetch(`${host}/api/notes/updateNote`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ id, title, description, tag }),
    });
    // console.log(id, title, description, tag);
    if(res){
      props.alert('success',"Updated Successfully!")
    }
    setTimeout(fetchNotes, 2000);
  }

  // function to fetch user details //
  let getuser = async () => {
    // API Call by using fetch command //
    let res=await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    res= await res.json()
    // console.log(res)
    setuser(res)
    return res;
  }
  // function to update user//
  let updateuser = async (name, email, mobile,address) => {
    // API Call by using fetch command //
    const res=await fetch(`${host}/api/auth/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({name,email, mobile,address  }),
    });
    if(res){
      props.alert('success',"Updated Successfully!")
      console.log(res)
    }
    getuser()
  }
  
  
  return (
    // context provider to provide values to components //
    <>
      <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, fetchNotes,user,updateuser,getuser }}>
        {props.children}
      </NoteContext.Provider>
    </>
  );
}
