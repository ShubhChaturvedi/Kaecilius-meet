import React ,{useEffect, useCallback, useState} from 'react'
import Navbar from './Navbar'
import ReactPlayer from "react-player" 
import peer from '../service/peer'
import { useSocket } from '../context/SocketProvider'

export default function Room() {

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const socket = useSocket();
  const [myStream , setMyStream] = useState();
  const streamBack = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio:true, video:true});
    const offer = await peer.getOffer();
    socket.emit("user:call", {to: remoteSocketId ,offer});
    setMyStream(stream);
  }, [remoteSocketId, socket])
  const handelUserJoin = useCallback(({email, id})=>{
    console.log(`Email ${email} joined`)
    console.log(id)
    setRemoteSocketId(id)
  },[])
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const handelVideo = ()=>{
    setVideo(!video)
    myStream.getVideoTracks()[0].enabled = video;
  }
  const handelIncommingCall = useCallback(({from, offer})=>{
    console.log("incomming call", from, offer);
  },[])
  const handelAudio = ()=>{
    setAudio(!audio);
    myStream.getAudioTracks()[0].enabled = audio;
  }
  useEffect(() => {
    socket.on("user:joined", handelUserJoin);
    socket.on("incomming:call", handelIncommingCall);
    return (()=>{
      socket.off("user:joined", handelUserJoin);
      socket.off("incomming:call", handelIncommingCall);
    })
  }, [socket, handelUserJoin, handelIncommingCall])
  return (
    <div>
      <Navbar/>
      <div className="container d-flex" style={{ height: "70vh", justifyContent:"space-around", alignItems:"center", color:"white", flexWrap:"wrap"}}>
        <div className="left">
        {myStream && <ReactPlayer  playing muted width="40rem" height="30rem" url={myStream}/>}
        </div>
        <div className="right text-center">
          <h4>{remoteSocketId? "Connected" :<>No one is in the room</>}</h4>
          {!myStream && <button className="btn" style={{backgroundColor : "#b72c64", color:"white"}} onClick={streamBack}>Stream Now</button>}
          {myStream && <>
          <button className='btn' onClick={handelVideo}><img width="48" height="48" src="https://img.icons8.com/ios-filled/50/b72c64/video-call.png" alt="video-call"/></button>
          <button className="btn" onClick={handelAudio}>{audio?<img width="48" height="48" src="https://img.icons8.com/sf-regular-filled/48/b72c64/microphone.png" alt="microphone"/>:<img width="48" height="48" src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/b72c64/external-mic-off-interface-essentials-kmg-design-glyph-kmg-design.png" alt="external-mic-off-interface-essentials-kmg-design-glyph-kmg-design"/>}</button>
          </>
          }
        </div>
      </div>
    </div>
  )
}
