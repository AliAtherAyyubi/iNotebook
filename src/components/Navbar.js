import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import '../CSS/profile.css'
import AccountMenu from './AccountMenu';
// import Loader from './Loader'

export default function Navbar(props) {
  let location = useLocation();
  
  React.useEffect(() => {
    // console.log(location.pathname)
  }, [location]);
  
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" style={{height:"60px"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">CloudNotes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">About</Link>
        </li>  
      </ul>
      <form className="d-flex" role="search">
        
        {localStorage.getItem('token') && <AccountMenu/>}
          {/* // login button  */}
        {!localStorage.getItem('token') && <Link className="btn btn-primary mx-3 text-white "  to="/login">Login</Link>}

        {!localStorage.getItem('token') && <Link className="btn btn-primary text-white "  to="/signup" style={{marginRight:"20px"}}>Sign Up</Link>}

      </form>
    </div>
  </div>
</nav>

    </>
  )
}
