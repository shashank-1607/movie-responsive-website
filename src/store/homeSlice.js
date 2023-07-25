import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    //In below two, we'll be saving data that will be coming from API
    url: {},
    genres: {},
  },
  reducers: {
    //getApiConfiguration and getGenres are called actions

    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getGenres, getApiConfiguration } = homeSlice.actions;

export default homeSlice.reducer;
