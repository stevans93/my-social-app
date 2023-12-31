import axios from 'axios';

class PostsService {
	static allPosts = (page, limit) => axios.get(`/posts/all?page=${page}&limit=${limit}&public=0`);

    static addLike = (id) => axios.post(`/likes/addRemove/${id}`);

    static removePost = (id) => axios.delete(`/posts/singlePost/${id}`);

    static createNewPost = (body) => axios.post('/posts/add', body);

    static getSinglePost = (id) => axios.get(`/posts/${id}`);

    static searchPosts = (title) => axios.get(`/posts/search?q=${title}`);
}

export default PostsService;