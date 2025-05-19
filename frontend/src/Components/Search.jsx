import React from 'react';

const Search = ({ searchValue, setsearchValue, onSearch }) => {
  return (
    <div className='w-full flex justify-end px-2 md:px-8 pt-4 bg-gray-100'>
      <form onSubmit={onSearch} className='flex gap-4 w-full '>
        <input
          className='flex-1 border border-black bg-white rounded-md px-2 py-1 md:py-2'
          name='value'
          value={searchValue}
          onChange={(e) => setsearchValue(e.target.value)}
          type='text'
          placeholder='Search Car'
        />
        <button
          type='submit'
          className='w-20 cursor-pointer hover:bg-gray-100 hover:text-[rgb(2,6,111)] md:w-28 h-9 md:h-11 text-white bg-[rgb(2,6,111)] rounded-md'
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
