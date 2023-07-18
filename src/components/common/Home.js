import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import img from '../macbook.jpeg';


export default function Home() {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        console.log(authToken)
        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/register')
        }
    }, [])
    return (
        <div className='homep'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        Welcome to Home Page <br></br>
                        <img src={img}></img>
                    </div>
                </div>
            </div>

            <Button variant="contained" onClick={handleLogout}>Log out</Button>
        </div>
    )
}