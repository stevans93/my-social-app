import axios from 'axios';

class PostsService {
	static allPosts = () => axios.get(`/posts/all`);

    static addLike = (id) => axios.post(`/likes/addRemove/${id}`);

    static removePost = (id) => axios.delete(`/posts/${id}`);
}

export default PostsService;