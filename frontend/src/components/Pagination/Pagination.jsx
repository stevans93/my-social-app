import React, { useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function Pagination() {
    const {count} = useSelector(state => state.postsStore);

    const [searchParams, setSearchParams] = useSearchParams()

    let page = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1;
    let limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 6;

    useEffect(() => {
        handleSearchParams(page);
    }, [searchParams]);

    const handleSearchParams = (page) => {
        setSearchParams({page, limit});
    };

    const handleNextPage = () => {
        if(page < Math.ceil(count / limit)) {
            handleSearchParams(page + 1);
        }
    }

    const handlePreviousPage = () => {
        if(page > 1) {
            handleSearchParams(page - 1);
        }
    }

    const pageOfPagination = () => {
        let numOfPages = Math.ceil(count / limit);

        return Array(numOfPages).fill(1).map((el, i) => {
            return(
                <button className={`${page === el + i ? 'text-blue-600 font-bold text-xl mb-1' : null}`} name={el + i} onClick={handleCurrentPage} key={i}>{el + i}</button>
            )
        })
    }

    const handleCurrentPage = (e) => {
        handleSearchParams(e.target.name)
    }

  return (
    <div className='flex w-[60%] mx-auto justify-center items-center mt-10 py-2 gap-3 border border-primary rounded-lg shadow bg-secondary'>
        <AiOutlineArrowLeft className='mr-[5px] w-[30px] h-[30px] cursor-pointer hover:text-blue-600' onClick={handlePreviousPage} />
        {pageOfPagination()}
        <AiOutlineArrowRight className='mr-[5px] w-[30px] h-[30px] cursor-pointer hover:text-blue-600' onClick={handleNextPage} />
    </div>
  )
}

export default Pagination;