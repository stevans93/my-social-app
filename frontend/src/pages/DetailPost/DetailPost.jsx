import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostsService from '../../services/postsService';
import moment from 'moment';
import CommentsService from '../../services/commentsService';
import { toast } from 'react-toastify';
import { ImCross } from 'react-icons/im';

function DetailPost() {
  const [postDetail, setPostDetail] = useState({});
  const [addComment, setAddComment] = useState('');
  const {id} = useParams();

  // Flags
  const [commentNew, setCommentNew] = useState(false);
  const [removeComment, setRemoveComment] = useState(false);

  useEffect(() => {
      PostsService.getSinglePost(id)
          .then((res) => {
            setPostDetail(res.data);
          })
          .catch((err) => {
              console.log(err);
          })
  }, [commentNew, removeComment])

  const handleInputComment = (e) => {
    setAddComment(e.target.value);
  }

  const handleSubmitComment = () => {
    CommentsService.addNewComment({
      body: addComment,
      postId: id,
    }).then((res) => {
      setCommentNew((prev) => !prev);

      toast.success('Comment added successful...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }).catch((err) => {
      console.log(err);
    })
    setAddComment('');
  }

  const handleDeleteComment = (commentId) => {
    CommentsService.deleteComment(commentId)
      .then((res) => {
        setRemoveComment(prev => !prev);

        toast.warning('Comment deleted successful...', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className='flex mt-7 border border-primary rounded-lg bg-secondary shadow gap-2 p-[20px]'>
      <div className='w-[50%]'>
        <h3>{postDetail.title}</h3>
        <ul className='flex gap-2'>
          {postDetail.tags && postDetail.tags.map((el, i) => {
            return (
              <li key={i}>#{el.name}</li>
            )
          })}
        </ul>
        <p>{postDetail.body}</p>
        <h2>Created By: {postDetail.user?.firstName} {postDetail.user?.lastName}</h2>
        <p>{moment(postDetail.createdAt).format('dddd, hA')}</p>
        <hr className='mt-2' />

        <div className='flex flex-col mt-2'>
          <h4>Write A Comment</h4> 
          <input value={addComment} onChange={handleInputComment} type="text" className='bg-secondary border p-[7px] rounded-md' placeholder='Add comment...'/>
          <button onClick={handleSubmitComment} className='bg-primary p-[10px] mt-2 rounded-lg cursor-pointer'>Add Comment</button>
          
          <div className='dashboard-sidebar p-3 border border-primary shadow mt-5 rounded-lg'>
            {postDetail.comments?.map((comm, i) => {
              return (
                <div key={i} className='border border-primary rounded-lg bg-secondary shadow gap-2 p-[10px] my-3'>
                  <h3>{comm.user.firstName} {comm.user.lastName}</h3>
                  <span>Posted: {moment(comm.createdAt).format('ll')}</span>
                  <p className='border border-primary rounded-md bg-[#817D7D] py-2 px-2 mt-2'>{comm.body}</p>
                  <div className='flex gap-3'>
                    <button className='bg-primary p-[10px] mt-3 rounded-lg cursor-pointer px-4'>Edit</button>
                    <button onClick={() => handleDeleteComment(comm._id)} className='bg-red-700 p-[10px] mt-3 rounded-lg cursor-pointer px-4'>Delete</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className='flex relative justify-center items-center w-[50%]'>
        <img src={postDetail.image} alt="postImage" className='max-w-[70%] max-h-[70%]' />
        <Link className='absolute right-2 top-2 cursor-pointer' to={'/posts'}>
          <ImCross />
        </Link>
      </div>
    </div>
  )
}

export default DetailPost;