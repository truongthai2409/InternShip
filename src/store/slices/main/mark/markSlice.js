import { createSlice } from "@reduxjs/toolkit";

const markJobSlice = createSlice({
  name: "mark",
  initialState: [],
  reducers: {
    addJob: (state, action) => {
      state.push(action.payload);
      return state;
    },
    removeJob: (state, action) => {
      const indexRemoveJob = state.findIndex(
        (job) => job.id === action.payload
      );
      state.splice(indexRemoveJob, 1);
      return state;
    },
  },
});

export const { addJob, removeJob } = markJobSlice.actions;
export default markJobSlice;
