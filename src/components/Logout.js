import React from 'react';
import { useEffect } from 'react';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import http from '../plugins/http';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const nav = useNavigate()
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        logOut();
    }, [])

    async function logOut() {
        http.get("logout").then(res => {
            if (res.success) {
                setUser(null)
                nav('/login')
            }
        })
    }
    return (
        <div>
        </div>
    );
};

export default Logout;