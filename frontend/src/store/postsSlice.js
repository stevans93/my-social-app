import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        count: null,
        posts: [],
        likedPost: false,
        removePost: false,
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
        }
    }
});

export const { storeAllPosts, removeSinglePost, likeSinglePost } = postsSlice.actions;
export default postsSlice.reducer;