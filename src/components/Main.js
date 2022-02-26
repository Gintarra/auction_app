import React, { useEffect, useState } from 'react';
import http from '../plugins/http';
import SinglePost from './SinglePost';

const Main = () => {
    const [getAll, setAll] = useState([])

    useEffect(() => {
        http.get("all-auctions").then(res => {
            if (res.success) {
                console.log(res.data)
                setAll(res.data)
            }
        })
    }, [])


    return (
        <div>
            {getAll.length > 0 && getAll.map((x, i) => <SinglePost item={x} key={i} setAll={setAll}  one={false} />)}

        </div>
    );
};

export default Main;