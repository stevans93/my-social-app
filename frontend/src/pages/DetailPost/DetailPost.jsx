import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostsService from '../../services/postsService';

function DetailPost() {
    const {id} = useParams();

    useEffect(() => {
        PostsService.getSinglePost(id)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

  return (
    <div>

    </div>
  )
}

export default DetailPost;