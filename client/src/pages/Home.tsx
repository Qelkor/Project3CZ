import React from 'react'
//import { useState, useEffect} from "react";
import Navbar from "../components/navbar"
import { useAtom } from 'jotai'
import { userAtom } from '../App'

const Home = () => {

  const [user, setUser] = useAtom(userAtom)
  // const [searchText, setSearchText] = useState("");

  // function handleChange(event: React.FormEvent<HTMLInputElement>) {
  //   event.preventDefault();
  //   setSearchText(event.target.value);
    
  // }

  




  return (
    <div>
      <Navbar />
      <p>Hello {user}</p>
      {/* <form >
    <div className="InputContainer">
        <input value={searchText} onChange={handleChange} type="text" placeholder="Search films..." className="SearchInput" />
      </div>
      </form>
      <p>search results</p> */}
      Homepage
    </div>
    
  )
}

export default Home;