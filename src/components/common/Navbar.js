import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Navbar = () => {

    const handleLogOut = () => {
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


    const handleLogIn = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/register')
    }
    // useEffect(() => {
    //     let authToken = sessionStorage.getItem('Auth Token')
    //     console.log(authToken)
    //     if (authToken) {
    //         navigate('/register')
    //     }

    //     if (!authToken) {
    //         navigate('/home')
    //     }
    // }, [])


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={handleLogIn}>Register</Button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <h3>User Registration</h3>
                    </Typography>
                    <Button color="inherit" onClick={handleLogOut}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar

