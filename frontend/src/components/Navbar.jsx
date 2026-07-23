import React from 'react'
import { Search } from "lucide-react"
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <nav className="bg-black text-gray-300 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">

      <Link to="/">
        <img src={Logo} alt="Logo" className="w-24 cursor-pointer brightness-125" />
      </Link>


      <ul className="hidden xl:flex space-x-4">
        <li className="cursor-pointer hover:text-[#e50914]"> Home </li>
        <li className="cursor-pointer hover:text-[#e50914]"> TV Shows </li>
        <li className="cursor-pointer hover:text-[#e50914]"> Movies </li>
        <li className="cursor-pointer hover:text-[#e50914]"> Anime </li>
        <li className="cursor-pointer hover:text-[#e50914]"> Games </li>
        <li className="cursor-pointer hover:text-[#e50914]"> New & Popular </li>
        <li className="cursor-pointer hover:text-[#e50914]"> Upcoming </li>
      </ul>

      <div className="flex items-center space-x-4 relative">
        <div className="relative hiddeen md:inline-flex">
          <input type="text" className="bg-[#333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none" placeholder='Search' />
          <Search className="absolute right-4 top-2 w-5 h-5" />
        </div>
        <button className="bg-[#e50914] text-white px-5 py-2 cursor-pointer hover:bg-[#f40612]">Get AI Movie Picks</button>

        <Link to={"/signin"}>
          <button className="border border-[#333] py-2 px-4 cursor-pointer hover:bg-[#444]">Sign in</button>
        </Link>

      </div>
    </nav>
  )
}
