import React, { useEffect, useEffectEvent, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { albumsData } from '../assets/assets'

const Display = () => {


    const displayRef = useRef() // creates a mutable reference that persists across component re-renders without causing a re-render itself, differentiating it from useState
    const location = useLocation() // returns an immutable object with information about the current URL, such as the pathname, search parameters, and any state passed during navigation
    const isAlbum = location.pathname.includes("album") // returns a boolean
    const albumId = isAlbum ? location.pathname.slice(-1) : "" // returns a string
    const bgColor = albumsData[Number(albumId)].bgColor
    
    useEffect(() => {
        if (isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
        } else {
            displayRef.current.style.background = `#121212`
        }
    })


  return (
    <div ref={displayRef} className='w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes>
            <Route path='/' element={ <DisplayHome /> } />
            <Route path='/album/:id' element={ <DisplayAlbum /> } />
        </Routes>
    </div>
  )
}

export default Display