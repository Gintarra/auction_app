import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../plugins/http';
import { useState } from 'react';

const CreateAuction = () => {
    const [getError, setError] = useState(null)
    const inp = {
        title: useRef(),
        url: useRef(),
        startPrice: useRef(),
        endTime: useRef()
    }
    const nav = useNavigate()
    async function uploadPost() {

        const post = {
            image: inp.url.current.value,
            title: inp.title.current.value,
            startPrice: Number(inp.startPrice.current.value),
            endTime: Math.floor((Date.now() + Number(inp.endTime.current.value))/1000)
        }
        //  console.log(new Date (post.endTime).toLocaleString('lt-LT'))
        http.post(post, "create").then(res => {
            if (res.success) {
                console.log(res.data)
                inp.url.current.value = ""
                inp.title.current.value = ""
                inp.startPrice.current.value = ""
                inp.endTime.current.value = ""
                setError(null)
                nav('/')
            } else {
                setError(res.error)
            }
        })
    }

    return (
        <div className='d-flex column align-center reg-log-container m-custom'>
            <input className='input m-5' type="text" placeholder='Image URL' ref={inp.url} />
            <input className='input m-5' type="text" placeholder='Title' ref={inp.title} />
            <input className='input m-5' type="number" placeholder='Start price' ref={inp.startPrice} />
            <div>Duration:</div>
            <select name="endTime" className="inputEndSelect" defaultValue="5min" ref={inp.endTime}>
                <option value="60000" >1 min</option>
                <option value="300000">5 min</option>
                <option value="3600000">1 h</option>
                <option value="43200000">12 h</option>
            </select>
            <button className='btn' onClick={uploadPost}>Upload</button>
            {getError && <div className='d-flex justify-center '>{getError}</div>}
        </div>
    );
};

export default CreateAuction;