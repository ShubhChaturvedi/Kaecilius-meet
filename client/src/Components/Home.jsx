import React from 'react'
import "./home.css"
import {useNavigate} from "react-router-dom"
import { useState, useCallback, useEffect } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { useSocket } from '../context/SocketProvider';

export default function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const autoGenerateCode = () => {

    const code = Math.floor(Math.random() * 1000000);
    setCode(code);
  }
  const socket = useSocket();
  const handelJoinRoom = useCallback((data)=>{
    const {email, code} = data;
    console.log(email)
    navigate(`/room/${code}`)
  },[navigate])
  useEffect(() => {
    socket.on("join-room", handelJoinRoom);
    return ()=>{
      socket.off("join-room", handelJoinRoom)
    }
  }, [socket, handelJoinRoom]);
  const submitForm = useCallback((e) => {
    e.preventDefault();
    socket.emit("join-room", {email, code});


  }, [email, code , socket]);

  return (
    <>
    <Navbar />
    <div className="m-4" style={{ margin: "auto",height: "70vh", display:"flex", justifyContent: "space-around" }} data-bs-theme="dark">
      <div className="left my-5" style={{alignItems:"center"}}>
        <h4 className="my-3" style={{color: "#fff", width: "25rem"}}>A perfect solution to connect with your loved ones via premium quality video calls</h4>
        <div className="card" style={{width: "25rem" ,margin: "auto" }} >
  <div className="card-body">
    <div className="card-text d-flex" style={{borderBottom: "1px sloid white"}}>
      <div className="Join-call text-center" style={{width: "50%"}}>
        <p>Join call</p>
      </div>
      <div className="Create-call text-center" style={{width: "50%"}}>
        <p>Create call</p>
      </div>
    </div>
    <h3 className="card-title text-center my-2">Welcome to Kaecilius</h3>
    <form onSubmit={submitForm}>
  <div className="my-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Call code or link</label>
    <input type="text" value={code} onChange={e => setCode(e.target.value)} className="form-control"/>
  </div>
  <button type="submit" className="btn mr-2" style={{backgroundColor : "#b72c64"}}>Join Call</button>
  <button type="submit" className="btn mx-2" onClick={autoGenerateCode} style={{backgroundColor : "#b72c64"}}>Auto-generate call code</button>
</form>
  </div>
</div>
</div>

<div className="right d-flex">
  <div className="toastses">
  <div className="toast my-5" data-bs-theme="dark" style={{display:"block", color:"#fff"}} role="alert" aria-live="assertive" aria-atomic="true">
  <div className="toast-header" >
    <strong className="me-auto">Ammi</strong>
    <small>11 mins ago</small>
    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div className="toast-body">
    Hello, John! How was your day?
  </div>
</div>
<div className="toast m-5" data-bs-theme="dark" style={{display:"block", color:"#fff"}} role="alert" aria-live="assertive" aria-atomic="true">
  <div className="toast-header" >
    <strong className="me-auto">John</strong>
    <small>9 mins ago</small>
    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div className="toast-body">
    Hello, Ammi! I had a great day. How was yours?
  </div>
</div>
<div className="toast my-5" data-bs-theme="dark" style={{display:"block", color:"#fff"}} role="alert" aria-live="assertive" aria-atomic="true">
  <div className="toast-header" >
    <strong className="me-auto">Ammi</strong>
    <small>8 mins ago</small>
    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div className="toast-body">
    It was good. I went to the market and bought some vegetables.
  </div>
</div>
<div className="toast m-5" data-bs-theme="dark" style={{display:"block", color:"#fff"}} role="alert" aria-live="assertive" aria-atomic="true">
  <div className="toast-header" >
    <strong className="me-auto">John</strong>
    <small>7 mins ago</small>
    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div className="toast-body">
    That's great. I'll be home soon.
  </div>
</div>
<div className="toast my-5" data-bs-theme="dark" style={{display:"block", color:"#fff"}} role="alert" aria-live="assertive" aria-atomic="true">
  <div className="toast-header" >
    <strong className="me-auto">Ammi</strong>
    <small>Just now</small>
    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div className="toast-body">
    Okay, John. See you soon.
  </div>
</div>
  </div>

 <img src="/avatar.png" style={{width: "40rem"}} alt="" />
</div>
    </div>
    <Footer />

    </>
  )
}
