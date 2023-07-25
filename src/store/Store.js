//creating a Redux Store and also automatically configure the Redux DevTools extension so that you can inspect the store while developing

import { configureStore } from "@reduxjs/toolkit";

//below we have imported reducer function from Slice
import homeSlice from "./homeSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice, // Here I am saving homeSlice in a key named 'home'. This home key can be checked in ReduxDev tool which will have values of url and genres from homeSlice
  },
});
