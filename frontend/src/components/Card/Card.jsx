import React, { useState } from 'react';
import moment from 'moment'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { ImBin } from 'react-icons/im';
import PostsService from '../../services/postsService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { likeSinglePost, removeSinglePost } from '../../store/postsSlice';
import { MdOutlineVisibility } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Card({post}) {

  const [isActive, setIsActive] = useState(false);
  let user = JSON.parse(localStorage.getItem('sm_user'));
  const dispatch = useDispatch();

  const handleAddLike = () => {
    PostsService.addLike(post._id)
      .then((res) => {
        dispatch(likeSinglePost());
      })
      .catch((err) => console.log(err));

      setIsActive(current => !current);
  }

  const handleRemovePost = () => {
    PostsService.removePost(post._id)
      .then((res) => {
        toast.success('Post deleted successfully...', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        dispatch(removeSinglePost());
      })
      .catch((err) => console.log(err));
  }
  
  return (
    <div className='flex flex-col border border-primary rounded-lg shadow overflow-hidden bg-primary'>
        <div className='relative'>
          <div className='absolute top-0 left-0 right-0 bottom-0 bg-black opacity-20 hover:opacity-0 transition-all'></div>
          <img src={post.image} alt="card-img" className='h-[150px] w-full object-cover' />
          <h3 className='absolute top-2 left-2'>{post.user.firstName} {post.user.lastName}</h3>
          <p className='absolute top-8 left-2'>{moment(post.createdAt).format('dddd,Ah')}</p>
          <Link to={`/detailPost/${post._id}`}>
            <MdOutlineVisibility className='absolute top-1 right-2 text-2xl cursor-pointer' />
          </Link>
        </div>

        <div className='p-[7px] grow flex flex-col gap-3'>
          <ul className='flex gap-2'>
            {post.tags.map((tag, i) => {
              return <li key={i} className='text-gray-400'>#{tag.name}</li>
            })}
          </ul>
          <h4>{post.title.substring(0, 10)}...</h4>

          <p>{post.body.substring(0, 30)}...</p>

          <div className='flex justify-between items-center'>
            
            {post.likeInfo?.usersId.includes(user._id) ? (
              <div className={ isActive ? `flex items-center gap-1 text-blue-600 text-[18px] cursor-pointer rise-shake` : `flex items-center gap-1 text-blue-600 text-[18px] cursor-pointer`}>
                <AiFillLike onClick={handleAddLike}/>
                <span>{post.likeInfo?.users.length > 0 ? post.likeInfo?.users.length : 0}</span>
            </div>
            ) : (
              <div className={ isActive ? `flex items-center gap-1 text-[18px] cursor-pointer rise-shake` : `flex items-center gap-1 text-[18px] cursor-pointer`}>
                <AiOutlineLike onClick={handleAddLike}/>
                <span>{post.likeInfo?.users.length > 0 ? post.likeInfo?.users.length : 0}</span>
            </div>
            )}
            
            {post.user._id === user._id ? (
              <div className='flex items-center gap-1 text-[18px] text-red-600 cursor-pointer'>
              <ImBin onClick={handleRemovePost}/>
              <span>Remove</span>
            </div>
            ) : (
              null
            )}
          </div>


        </div>
    </div>
  )
}

export default Card;