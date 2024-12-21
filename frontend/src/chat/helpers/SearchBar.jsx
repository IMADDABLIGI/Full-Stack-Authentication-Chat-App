import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <div className='flex items-center mt-[70px] mb-[40px] ml-[50px] px-5 gap-[10px]  h-[50px] w-[75%] border border-gray-300 rounded-[10px] shadow-lg'>
        <SearchIcon className='text-primary ' style={{width:"25px", height:"25px"}}/>
        <p className='text-gray-300 text-bold'> Search </p>
    </div>
    // <div className='flex items-center mt-[70px] mb-[50px] ml-[50px] px-5 gap-[10px]  h-[40px] w-[70%] border border-gray-300 rounded-[10px] shadow-lg'>
    //     <SearchIcon className='text-primary ' style={{width:"25px", height:"25px"}}/>
    //     <p className='text-gray-300 text-bold'> Search </p>
    // </div>
  )
}

export default SearchBar
