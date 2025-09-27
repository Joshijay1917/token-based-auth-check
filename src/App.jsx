import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Components/Regsiter/Register'
import { Store } from './Context/Store'

function App() {
  const storeData = useContext(Store)
  const { curretnUser } = storeData

  console.log("User ", curretnUser);
  
  /*
avatar: "http://res.cloudinary.com/diyahmp7k/image/upload/v1758909732/bgehfja3aazyb9vjmimj.png"
coverImage: "http://res.cloudinary.com/diyahmp7k/image/upload/v1758909733/kdkkeqq9g8slwd12wafb.jpg"
createdAt: "2025-09-26T18:02:12.157Z"
email: "jayjoshi1912007@gmail.com"
fullname: "Joshi Jay"
updatedAt: "2025-09-26T18:03:15.245Z"
username: "joshi jay917"
watchHistory: []
_id: "68d6d5248f33241405c75c72" */

  return (
    <div>
      <h1>Home</h1>
      <div className='flex flex-col'>
        <div className='text-2xl font-bold'>User :</div>
        {/* <img src={curretnUser.avatar} className='w-30 h-30 rounded-full'/> */}
        <div className='flex gap-3 bg-gray-300 rounded-2xl p-3'>
        <img src={curretnUser.coverImage || curretnUser.avatar} className='w-30 h-30 rounded-full'/>
        <div className='flex justify-center flex-col items-start'>
        <div>{curretnUser.fullname}</div>
        <div>{curretnUser.username}</div>
        <div>{curretnUser.email}</div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default App