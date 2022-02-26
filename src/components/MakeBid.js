import React, {useRef} from 'react';
import http from "../plugins/http";
import UserContext from '../context/UserContext';
import { useContext } from 'react';

const MakeBid = ({setAuction, id}) => {
    const { setUser } = useContext(UserContext)
    const bidRef = useRef()

    function update() {
        const bid = {
            amount: bidRef.current.value,
            auctionId: id,
            timeBid: Date.now()
        }

        http.post(bid, "bid").then(res => {
            if(res.success) {
                console.log(res.data);
                setUser(res.data2)
                setAuction(res.data)
            }
        })
    }

    return (
        <div className="d-flex justify-center">
            <input type="number" className="bid-input" ref={bidRef} placeholder="Your bid"/>
            <button className="bid-btn" onClick={update}>Bid</button>
        </div>
    );
};        
            


export default MakeBid;