import axios from 'axios';

class PostsService {
	static allPosts = (page, limit) => axios.get(`/posts/all?page=${page}&limit=${limit}&public=0`);

    static addLike = (id) => axios.post(`/likes/addRemove/${id}`);

    static removePost = (id) => axios.delete(`/posts/${id}`);
}

export default PostsService;