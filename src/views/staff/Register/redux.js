import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    fetching: true,
    universityName: "",
    nameInEnglish: "",
    address: "",
    email: "",
    phone: "",
    publicKey: "",
    description: "",
    imgSrc: null,
    votes: [],
  }, // votes filed too
  reducers: {
    setProfile: (state, action) => {
      state.fetching = false;
      Object.assign(state, action.payload);
    },
    updateImgSrc: (state, action) => {
      state.imgSrc = action.payload;
    },
    updateVotingState: (state, action) => {
      if (state.state !== action.payload.state) state.state = action.payload.state;
      if (state.votes.length < action.payload.votes.length) state.votes = action.payload.votes;
    },
  },
});

export const { setProfile, updateImgSrc, updateVotingState } = profileSlice.actions;
export default profileSlice.reducer;
