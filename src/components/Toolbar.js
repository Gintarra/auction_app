import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';


const Toolbar = () => {
    const { getUser } = useContext(UserContext)
    return (
        <div className='d-flex space-ev toolbar align-center'>
            {getUser &&
                <div className='user-toolbar'>
                    <div className='user-stats'>{getUser.username}</div>
                    <div className='user-stats'>Money: {getUser.money}$</div>
                    <div className='user-stats'>Reserved money: {getUser.reservedMoney}$</div>
                </div>}
            <Link className='link' to="/register">Register</Link>
            {!getUser && <Link className='link' to="/login">Login </Link>}
            <Link className='link' to="/profile">Profile</Link>
            <Link className='link' to="/">Main</Link>
            {getUser && <Link className='link' to="/create">Create auction</Link>}
            {getUser && <Link className='link' to="/logout">Logout</Link>}
        </div>
    );
};

export default Toolbar;