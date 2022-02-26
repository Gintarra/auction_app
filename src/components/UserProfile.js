import React, { useEffect, useState } from 'react';
import http from '../plugins/http';
import UserContext from '../context/UserContext';
import { useContext } from 'react';


const UserProfile = () => {
    const [userData, setUserData] = useState(null)
    const { getUser } = useContext(UserContext)
    const [getAll, setAll] = useState([])
    const [getMyBids, setMyBids] = useState([])

    useEffect(() => {
        http.get("profile").then(res => {
            if (res.success) {
                setUserData(res.data)
            }
        })
    }, [])

    useEffect(() => {
        http.get("all-auctions").then(res => {
            if (res.success && getUser) {
                const myAuctions = res.data.filter(y => y.ownerName === getUser.username)
                const myBids2 = []
                const myBids = res.data.map(x => x.bids.filter(y => y.username === getUser.username ? myBids2.push({ bid: y, auc: x.image }) : null))
                setAll(myAuctions)
                setMyBids(myBids2)
            }
        })
    }, [])

    return (
        <div>
            {getUser && userData &&
                <div className='d-flex justify-center column align-center m-custom'>
                    <img className='user-image' src={userData.image} alt="" />
                    <h4>Money: {userData.money}$</h4>
                    <h4>My auctions:</h4>
                    {getAll.length === 0 && <div>You don't have auctions</div>}
                    <div className="d-flex wrap justify-center ">
                        {getAll.map((item, i) =>
                            <div key={i} className={item.active ? 'post2 d-flex column' : 'post2-inactive d-flex column'} >
                                <div>
                                    <h4 className='text-center'>{item.title}</h4>
                                </div>
                                <div className='d-flex '>
                                    <img src={item.image} alt="" />
                                    <div className='d-flex column'>
                                        <h4>Price: {item.price}$</h4>
                                        <h4>Bids: {item.bids.length}</h4>
                                    </div>
                                </div>
                            </div>)}
                    </div>
                    <h4>My bids history:</h4>
                    {getMyBids.length === 0 && <div>You don't have bids</div>}
                    <div className="d-flex wrap justify-center ">
                        {getMyBids.map((x, i) =>
                            <div key={i} className="d-flex bid-container column align-center">
                                <img src={x.auc} alt="" />
                                <div className='d-flex space-btw'>
                                    <div>{new Date(x.bid.time).toLocaleString("lt-LT")}</div>
                                </div>
                                <h4 className='m-5'>Bid amount: {x.bid.price}$</h4>
                            </div>
                        )}
                    </div>
                </div>}

            {!getUser && <div className='d-flex justify-center m-custom '>
                <h3>You are not logged in</h3>
            </div>}
        </div>
    );
};

export default UserProfile;