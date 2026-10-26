"use client"

import { useState } from "react"

export default function Header(){
  const [text,setText] = useState("");
  return(
    <div>
      <h1>Hello to my cocktail list !!!</h1>
      <input className="text-center w-80"
      value={text}
      placeholder="Write here the cocktail you would like"
      onChange={(e)=>{setText(e.target.value)}}
      />
      <p>{text}</p>
    </div>
  )
}