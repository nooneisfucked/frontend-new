import React from 'react'
import { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { use } from 'react'

const[letter,setLetter] = useState(File)

const baseUrl = "/api"

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