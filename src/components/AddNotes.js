import React,{useState,useContext} from 'react'
// import "../CSS/noteitem.css"
import NoteContext from '../context/note/noteContext'
export default function AddNotes(props) {
    let context= useContext(NoteContext);
    const {addNote}= context;
    // use states to store values of title,des...
    const [note, setnote] = useState({title:"",desc:"",tag:""})
    
    // creating on change function to set vaules of title...//

    const onChange= (e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    // creating handle change
    let handleChange= (e)=>{
        e.preventDefault()
        addNote(note.title,note.desc,note.tag)
        setnote({title:"",desc:"",tag:""})
        // props.alert('success','Your Notes has been added successfully!')
    }
  return (
    <>
    <h2>Add a Note</h2>
        <form >
          <div className="mb-3">
            <label htmlFor="exampleInputtitle" className="form-label h5">
              Title
            </label>
            <input
              type="text" name='title' value={note.title}
              className="form-control"
              id="exampleInputtitle" onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputdesc" className="form-label h5">
              Description
            </label>
            <input
              type="text" name='desc' value={note.desc}
              className="form-control"
              id="exampleInputdesc" onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtag" className="form-label h5">
              Tag
            </label>
            <input
              type="text" name='tag' value={note.tag}
              className="form-control"
              id="exampleInputtag" onChange={onChange}
            />
          </div>
          
          <button disabled={note.title.length<2 || note.desc.length<5} type="submit" className="btn btn-primary" onClick={handleChange}>
            Add Note
          </button>
        </form>
    </>
  )
}
