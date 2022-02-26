import React from 'react';
import { useParams } from 'react-router-dom';
import http from '../plugins/http';
import { useEffect, useState } from 'react';
import SinglePost from './SinglePost';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import MakeBid from './MakeBid';
import SingleBid from './SingleBid';

const Auction = () => {
    const { id } = useParams()
    const [auction, setAuction] = useState(null)
    const { getUser } = useContext(UserContext)
    const [getAll, setAll] = useState([])

    useEffect(() => {
        getAuctionData();
    }, [getAll])

    async function getAuctionData() {
        http.get("auction/" + id).then(res => {
            if (res.success) {
                setAuction(res.data)
            }
        })
    }

    return (
        <div>
            {auction && <div>
                <SinglePost item={auction} one={true} setAll={setAll} />
                <div >
                    {getUser && getUser.username !== auction.ownerName && auction.active && <MakeBid setAuction={setAuction} id={auction._id}/>}
                </div>
                <div>
                    <h3 className='text-center'>Bids history:</h3>
                    <div  className='d-flex column-reverse'>
                          {auction.bids.map((x, i) => <SingleBid item={x} key={i}/>)}
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Auction;