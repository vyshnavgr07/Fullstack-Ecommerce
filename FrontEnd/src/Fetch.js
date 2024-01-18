import React, { useState } from 'react'

const Fetch = () => {
    const [data,setdata]=useState([]);
    fetch("https://api.postalpincode.in/pincode/673307")
    .then((res)=>res.json())
    .then((log)=>setdata(log))
    console.log(data);
  return (
    <div>
    {data.map((x)=>(
        <div>
            <h1>{x.Name}</h1>
            </div>
    ))}



    </div>
  )
}

export default Fetch