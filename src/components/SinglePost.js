import React from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import http from '../plugins/http';
import { useEffect } from 'react';
import UserContext from '../context/UserContext';
import { useContext } from 'react';

const SinglePost = ({ item, one, setAll }) => {
    const { setUser } = useContext(UserContext)
    const [getD, setD] = useState(0)
    const [getS, setS] = useState(0)
    const [getM, setM] = useState(0)
    const [getH, setH] = useState(0)
    const nav = useNavigate()

    useEffect(() => {
        let int = setInterval(timeLeft, 1000)
        function timeLeft() {
            let end = item.endTime*1000
            let id = item._id
            let active = item.active
            let difference = 0
            let daysDifference = 0
            let hoursDifference = 0
            let minutesDifference = 0
            let secondsDifference = 0
            difference = end - Math.floor(Date.now()/1000)*1000     
            if(difference >= 0) {
                    daysDifference = Math.floor(difference  /1000/ 60 / 60 / 24);
                    difference -= daysDifference *1000 * 60 * 60 * 24

                    hoursDifference = Math.floor(difference/1000 / 60 / 60);
                    difference -= hoursDifference*1000 * 60 * 60

                    minutesDifference = Math.floor(difference/1000 / 60);
                    difference -= minutesDifference*1000  * 60

                    secondsDifference = Math.floor(difference/1000);

                    setD(daysDifference)
                    setH(hoursDifference)
                    setM(minutesDifference)
                    setS(secondsDifference)
                    //  console.log(end, "end")
                    //console.log(Math.floor(Date.now()/1000)*1000 )
                    //console.log(difference, "skirtumas")
                    // console.log(secondsDifference, "min")
                    // if(difference === 0 && active){
        
                     if(daysDifference === 0 && minutesDifference===0 && hoursDifference === 0 && secondsDifference === 0 && active){
                             //  console.log(difference, "skirtumas")
                            clearInterval(int)
                            const obj = {
                                id,
                                active
                            }      
                            console.log('atejo i nulio zona', id);
                            http.post(obj, "bidEnd").then(res => {
                                console.log('atejo i bida')
                                if (res.success) {
                                    console.log(res.data);
                                    setAll(res.data)
                                    console.log(res.data2);
                                    setUser(res.data2)
                                }
                            })
                            clearInterval(int)
                            console.log( int)  
                     }
            }   
        }
        return () => clearInterval(int)
    },[item])

    function goToAuction(id) {
        if (item.active) {
            nav('/auction/' + id)
        }
    }
  
    return (
        <>       
            <div className={item.active ? 'post d-flex' : 'post-inactive d-flex'} style={{pointerEvents:  one && 'none' }} onClick={() => goToAuction(item._id)}>
                    <div className='d-flex grow5'>
                        <div>
                            <img src={item.image} alt="" />
                        </div>
                        <div>
                            <h3>{item.title}</h3>
                            <h3>Price: {item.price}$</h3>
                            <h3>Seller: {item.ownerName}</h3>
                        </div>
                    </div>
                    <div className='grow1'>
                        <h4>Time left:</h4>  
                        <h3> {getD} d     {getH}:{getM}:{getS}</h3>
                        <h4>Bids: {item.bids.length}</h4>
                    </div>
            </div> 
        </>
    );
};

export default SinglePost;



// function timeLeft(end) {
//     let int;
//     let time = 0
//     if (end - Date.now() < 0) {
//         clearInterval(int)
//         setTime("end")
//         return;
//     }
//     int = setInterval(() => {
//         setTime(end - Date.now())
//     }, 1000)
//   // return getTime
// }


// console.log('difference = ' +
// daysDifference + ' day/s ' +
// hoursDifference + ' hour/s ' +
// minutesDifference + ' minute/s ' +
// secondsDifference + ' second/s ');


// function timeLeft(end, id, active) {
//     // clearInterval(int)
//     let difference = 0
//     let daysDifference = 0
//     let hoursDifference = 0
//     let minutesDifference = 0
//     let secondsDifference = 0
//     if (end - Date.now() <= 0) {
//         // setD(0)
//         // setH(0)
//         // setM(0)
//         // setS(0)
//         // console.log(getS, "sekundes if", end-Date.now(), "data atimta")
//         clearInterval(int)
//     } else {
//         int = setInterval(() => {
//             difference = end - Date.now()
//          //   console.log(difference, "skirtumas")
//             if (difference < 0) {
//                 console.log(difference, "skirtumas")
//                 // console.log(end / 1000, "end")
//                 // console.log('o cia')
//                 // console.log(Math.round(Date.now() / 1000), "now")
               
//                     const obj = {
//                         id,
//                         active
//                     }
//                     http.post(obj, "bidEnd").then(res => {
//                         //    console.log('atejo i bida')
//                         if (res.success) {
//                             console.log(res.data);
//                             console.log(res.data2);
//                           //  return
//                         }
//                     })
//                 int = clearInterval(int)
//                // return
//             }
//             daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
//             difference -= daysDifference * 1000 * 60 * 60 * 24

//             hoursDifference = Math.floor(difference / 1000 / 60 / 60);
//             difference -= hoursDifference * 1000 * 60 * 60

//             minutesDifference = Math.floor(difference / 1000 / 60);
//             difference -= minutesDifference * 1000 * 60

//             secondsDifference = Math.floor(difference / 1000);

//             setD(daysDifference)
//             setH(hoursDifference)
//             setM(minutesDifference)
//             setS(secondsDifference)

//         }, 1000)
//     }
// }