import React from 'react'
import { MdSearch } from "react-icons/md";
import '../styles/searchbox.scss';

function SearchBox() {
  return (
    <form className='search_box'>
      <fieldset className='search_inner'>
        <legend className='blind'>검색창</legend>
        <MdSearch />
        <input type="search" name="search" id="search" placeholder="Find friends, chats, Plus Friends" />
      </fieldset>
    </form>
  )
}

export default SearchBox