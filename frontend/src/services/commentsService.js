import axios from "axios";

class CommentsService {
    static addNewComment = (body) => axios.post('/comments/add', body);

    static deleteComment = (id) => axios.delete(`/comments/${id}`);
}

export default CommentsService;