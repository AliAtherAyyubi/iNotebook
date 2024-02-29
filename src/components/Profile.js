import React, { useContext,useState,useRef,useEffect } from 'react'
import NoteContext from '../context/note/noteContext'

export default function Profile() {
    let refclose=useRef(null)
    let context= useContext(NoteContext)
    let {updateuser,getuser,user}=context

    useEffect(() => {
        getuser();
      }, [])
    // let user= getuser();
    // state to set or update user attributes//
  const [euser, setuser] = useState({name:"",email:"",mobile: "",address:""});

  // onChange function to type //
  const onChange = (e) => {
    setuser({ ...euser, [e.target.name]: e.target.value });
  };
  // creating handle change
  let handleChange = (e) => {
    e.preventDefault();
    updateuser(euser.name,euser.email,euser.mobile,euser.address);
    // setnote({ id: "", name: "",: "": "" });
    refclose.current.click();
  };

  let update= ()=> {
    // ref.current.click();
    setuser({name: user.name, email: user.email,mobile: user.mobile,address:user.address});
  }
return (
    <>
    <section style={{backgroundColor:'#eee'}}>
  <div className="container py-5">

    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              className="rounded-circle img-fluid" style={{width:"150px"}}/>
            <h5 className="my-3">{user.name}</h5>
            <p className="text-muted mb-4">{user.email}</p>
          </div>
        </div>
        
      </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.name}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.email}</p>
              </div>
            </div>
            <hr/>
            
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Mobile</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.mobile}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.address}</p>
              </div>

            </div>
            <hr />
          <button className="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#exampleModal" onClick={update}>Edit</button>
          </div>
        </div>
      </div>
      <div className="card mb-4 mb-lg-0">
          <div className="card-body p-0">
            <ul className="list-group list-group-flush rounded-3">
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fas fa-globe fa-lg text-warning"></i>
                <p className="mb-0">https://mdbootstrap.com</p>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fab fa-github fa-lg"></i>
                <p className="mb-0">mdbootstrap</p>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fab fa-twitter fa-lg"></i>
                <p className="mb-0">@mdbootstrap</p>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fab fa-instagram fa-lg"></i>
                <p className="mb-0">mdbootstrap</p>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fab fa-facebook-f fa-lg"></i>
                <p className="mb-0">mdbootstrap</p>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </div>
</section>

{/* // modal to update a user // */}

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
                Update User
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
                    Name
                  </label>
                  <input
                    type="text"
                    name="name" value={euser.name}
                    className="form-control"
                    id="exampleInputtitle"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputdesc" className="form-label h5">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email" value={euser.email}
                    className="form-control"
                    id="exampleInputdesc"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtag" className="form-label h5">
                    Mobile
                  </label>
                  <input
                    type="number"
                    name="mobile" value={euser.mobile}
                    className="form-control"
                    id="exampleInputtag"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtag" className="form-label h5">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address" value={euser.address}
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
  )
}
