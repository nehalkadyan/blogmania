import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postArray: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addToLikedPost: (state, action) => {
      const { message } = action.payload;

      if (message === "delete") {
        const { postId } = action.payload;
        const postToDelete = state.postArray.findIndex(
          (post) => post.postId === postId
        );

        if (postToDelete !== -1) {
          state.postArray.splice(postToDelete, 1);
        }
      } else {
        state.postArray.push(action.payload);
      }
    },
  },
});

export const { addToLikedPost } = postSlice.actions;
export default postSlice.reducer;
