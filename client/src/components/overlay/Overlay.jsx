import React from 'react'
import './overlay.css'

export default function Overlay( props ) {

  const { content } = props;

  return (
    <div className='overlay'>
       { content}
    </div>
  )
}
