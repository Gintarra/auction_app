import React from 'react';

const SingleBid = ({ item }) => {
    return (
        <div className="d-flex bid-container column">
            <div className='d-flex space-btw'>
                <h4 className='m-5'>Username: {item.username}</h4>
                <div>{new Date(item.time).toLocaleString("lt-LT")}</div>
            </div>
            <h4 className='m-5'>Bid amount: {item.price}$</h4>
        </div>
    );
};

export default SingleBid;