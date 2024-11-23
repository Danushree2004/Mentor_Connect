import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Room.css';

const Room =()=>{
    const[roomCode,setRoomCode]=useState('');
const navigate= useNavigate();
    const handleFormSubmit=(ev)=>{
        ev.preventDefault();
        navigate(`/room/${roomCode}`);
    };
    return(
        <div className="room">
            <form className='room-page' onSubmit={handleFormSubmit}>
                <div>
                <label>Enter Room Code: </label>
                <input type="text" 
                value={roomCode} onChange={e=>setRoomCode(e.target.value)} placeholder='enter room code' required/>
                </div>
                <br/>
                <button className="button1" type='submit'>Enter Room</button>
            </form>
            </div>
    )
}
export default Room;