import React, { useEffect, useState } from 'react';
import PostsService from '../../services/postsService';
import { useDispatch, useSelector } from 'react-redux'
import { storeAllPosts } from '../../store/postsSlice';
import Card from '../../components/Card/Card';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import SearchPost from '../../components/SearchPost/SearchPost';
import CreatePost from '../../components/CreatePost/CreatePost';

function Posts() {

  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams()
 
	const dispatch = useDispatch();
	const { posts, removePost, likedPost, createNewPost } = useSelector((state) => state.postsStore);

	useEffect(() => {
    
    setIsLoading(true);
    let page = searchParams.get('page') ? searchParams.get('page') : 1;
    let limit = searchParams.get('limit') ? searchParams.get('limit') : 6;

		PostsService.allPosts(page, limit).then((res) => {
			dispatch(storeAllPosts(res.data));
      setIsLoading(false);
		});
	}, [removePost, searchParams, createNewPost]);

  useEffect(() => {
    let page = searchParams.get('page') ? searchParams.get('page') : 1;
    let limit = searchParams.get('limit') ? searchParams.get('limit') : 6;

		PostsService.allPosts(page, limit).then((res) => {
			dispatch(storeAllPosts(res.data));
      setIsLoading(false);
		});
	}, [likedPost]);

  return (
    <div className='flex mt-7 gap-5'>
        <div className='w-[70%]'>
            {isLoading ? (
              <div className="lds-dual-ring"></div>
            ) : (
              <>
                <div className='grid grid-cols-3 gap-3'>
                    {posts.map((post) => {
                        return <Card key={post._id} post={post} />;
                    })}
                </div>
                <Pagination />
              </>
            )}
        </div>
        <div className='w-[30%]'>
          <SearchPost />
          <CreatePost />
        </div>
    </div>
  )
}

export default Posts;