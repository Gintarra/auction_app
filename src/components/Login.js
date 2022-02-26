import React, { useContext } from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import http from '../plugins/http';


const Login = () => {
    const { setUser } = useContext(UserContext)
    const nav = useNavigate()
    const [getError, setError] = useState(null)
    const inp = {
        username: useRef(),
        pass: useRef()
    }
    async function login() {
        const user = {
            username: inp.username.current.value,
            pass: inp.pass.current.value,
        }
        http.post(user, "login").then(res => {
            if (res.success) {
                setUser(res.data)
                inp.username.current.value = ""
                inp.pass.current.value = ""
                setError(null)
                nav('/profile')
            } else {
                setError(res.message)
            }
        })
    }

    return (
        <div className='d-flex column align-center reg-log-container m-custom'>
            <input className='input m-5' type="text" placeholder='Username' ref={inp.username} />
            <input className='input m-5' type="password" placeholder='Password' ref={inp.pass} />
            <button className='btn' onClick={login}>Login</button>
            {getError && <div className='d-flex justify-center '>{getError}</div>}
        </div>
    );
};

export default Login;