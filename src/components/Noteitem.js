import React, { useContext} from "react";
import NoteContext from "../context/note/noteContext";
import "../CSS/noteitem.css"

export default function Noteitem(props) {
  const { note,updatenote} = props;
  let context = useContext(NoteContext);
  const { deleteNote} = context;
  return (
    <>
      <div className="col-md-4" style={{marginBottom:"30px"}} >
        <div className="card" >
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text my-4">{note.description}</p>
            <p style={{color:"gray",fontWeight:"500",fontSize:"15px"}}>#{note.tag}</p>
          </div>
          <div className="iconbox mb-2">
            <i className="uil uil-edit mx-3 editicon h4" title="Edit" onClick={()=>{updatenote(note)}}></i>
            <i
              className="uil uil-trash-alt delicon  h4" title="Delete"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
          </div>
        </div>
      </div>

    </>
  );
}
