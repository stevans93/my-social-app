import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        count: null,
        posts: [],
        likedPost: false,
        removePost: false,
        createNewPost: false,
    },

    reducers: {
        storeAllPosts: (state, action) => {
            state.count = action.payload.count;
			state.posts = action.payload.posts;
        },
        removeSinglePost: (state, action) => {
            state.removePost = !state.removePost;
        },
        likeSinglePost: (state, action) => {
            state.likedPost = !state.likedPost;
        },
        createPost: (state, action) => {
            state.createNewPost = !state.createNewPost;
        }
    }
});

export const { storeAllPosts, removeSinglePost, likeSinglePost, createPost } = postsSlice.actions;
export default postsSlice.reducer;