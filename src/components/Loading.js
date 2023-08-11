import React,{useState} from "react";

export default function Loading(props) {

  return (
    <>
      <div className="" style={{position:'absolute',top:'50%',left:'50%'}}>
        <div className="spinner-border" role="status" style={{width:'50px',height:"50px"}}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}
