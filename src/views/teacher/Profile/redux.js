import { createSlice } from "@reduxjs/toolkit";

export const teacherProfileSlice = createSlice({
  name: "teacherProfileSlice",
  initialState: { fetching: true, teacherId: "", name: "", email: "", department: "", publicKey: "", description: "", imgSrc: "" },
  reducers: {
    setProfile: (state, action) => {
      Object.assign(state, action.payload);
      state.fetching = false;
    },
    updateImgSrc: (state, action) => {
      state.imgSrc = action.payload;
    },
  },
});

export const { setProfile, updateImgSrc } = teacherProfileSlice.actions;
export default teacherProfileSlice.reducer;
