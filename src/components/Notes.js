import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../context/note/noteContext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  // using refHook to open a Modal //
  let navigate = useNavigate();
  const ref = useRef(null);
  let refclose = useRef(null);
  let context = useContext(NoteContext);
  const { notes, fetchNotes, updateNote, user } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) fetchNotes();
    else {
      navigate("/login");
      props.alert("warning", "Please login to get you Notes");
    }
  }, []);

  // state to set or update notes attributes//
  const [enote, setnote] = useState({
    id: "",
    etitle: "",
    edesc: "",
    etag: "",
  });
  // onChange function to type //
  const onChange = (e) => {
    setnote({ ...enote, [e.target.name]: e.target.value });
  };
  // creating handle change
  let handleChange = (e) => {
    e.preventDefault();
    updateNote(enote.id, enote.etitle, enote.edesc, enote.etag);
    setnote({ id: "", etitle: "", edesc: "", etag: "" });
    ref.current.click();
  };

  let updatenote = (n) => {
    ref.current.click();
    setnote({ id: n._id, etitle: n.title, edesc: n.description, etag: n.tag });
    // console.log(
  };
  // fetchNotes()
  // console.log(note)
  return (
    <>
      <h2 className="my-4 mx-5 welcomeline">
        Welcome, <span style={{ color: "red" }}>{user.name.toUpperCase()}</span>
      </h2>
      <div className="container my-3" style={{ maxWidth: "850px" }}>
        <AddNotes />

        <div className="notes" style={{ marginTop: "50px" }}>
          <h2 className="my-4">Your Notes</h2>
          <div className="row my-3">
            {notes.length === 0 && (
              <p style={{ color: "gray" }}>You don't have any Notes</p>
            )}

            {notes.map((note) => {
              return (
                <Noteitem key={note._id} note={note} updatenote={updatenote} />
              );
            })}
          </div>
        </div>
      </div>

      {/* // modal to update a Note // */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form method="post">
                <div className="mb-3">
                  <label htmlFor="exampleInputtitle" className="form-label h5">
                    Title
                  </label>
                  <input
                    type="text"
                    name="etitle"
                    value={enote.etitle}
                    className="form-control"
                    id="exampleInputtitle"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputdesc" className="form-label h5">
                    Description
                  </label>
                  <input
                    type="text"
                    name="edesc"
                    value={enote.edesc}
                    className="form-control"
                    id="exampleInputdesc"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtag" className="form-label h5">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="etag"
                    value={enote.etag}
                    className="form-control"
                    id="exampleInputtag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refclose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={enote.etitle.length < 2}
                className="btn btn-primary"
                onClick={handleChange}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
