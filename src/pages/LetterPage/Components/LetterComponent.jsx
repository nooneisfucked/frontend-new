import React from 'react'
import { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { use } from 'react'

const[letter,setLetter] = useState(File)

const baseUrl = "http://80.97.124.100:3000/api"

const storeToDb = async()=>{
    const[data,loading] = useFetch(`${baseUrl}/letter`)
}

const LetterComponent = () => {
  return (
    <div>
    
    </div>
  )
}

export default LetterComponent