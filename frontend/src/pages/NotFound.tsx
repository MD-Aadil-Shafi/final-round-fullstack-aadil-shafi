import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex justify-center items-center flex-col'>
        <h1>404 | Page not found!</h1>
        <Link to="/" className=''>Back to homepage</Link>
    </div>
  )
}

export default NotFound