import React, { useState } from 'react';

function SearchPost() {

    const [searchTitleInput, setSearchTitleInput] = useState('');

    const handleInputSearch = (e) => {
        setSearchTitleInput(e.target.value);
    }

    const handleSearch = () => {
        console.log(searchTitleInput);
    }

  return (
    <div className='flex flex-col border border-primary shadow p-[20px] rounded-lg bg-secondary'>
        <input value={searchTitleInput} onInput={(e) => handleInputSearch(e)} type="text" placeholder='Search post...' className='bg-secondary border p-[10px] rounded-md'/>
        <button onClick={handleSearch} className='bg-primary p-[6px] mt-[15px] rounded-lg'>Search</button>
    </div>
  )
}

export default SearchPost;