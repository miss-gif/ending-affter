import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    userRole: null,
    userAddress: null,
    userPhone: null,
    accessToken: null,
    tokenMaxAge: null,
    isLoggedIn: false,
    locationData: { latitude: "", longitude: "", geocodeAddress: "" },
    searchTerm: "",
    searchRestaurant: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setUserPhone: (state, action) => {
      state.userPhone = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    setTokenMaxAge: (state, action) => {
      state.tokenMaxAge = action.payload;
    },
    setLocationData: (state, action) => {
      const { latitude, longitude, geocodeAddress } = action.payload;
      state.locationData = { latitude, longitude, geocodeAddress };
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    searchRestaurant: (state, action) => {
      state.searchRestaurant = action.payload;
    },
    clearSearchTerm: state => {
      state.searchTerm = "";
      state.searchRestaurant = "";
    },
    logout: state => {
      state.userData = null;
      state.userRole = null;
      state.userAddress = null;
      state.userPhone = null;
      state.accessToken = null;
      state.tokenMaxAge = null;
      state.isLoggedIn = false;
      state.locationData = { latitude: "", longitude: "", geocodeAddress: "" };
      state.searchTerm = "";
      state.searchRestaurant = "";
    },
  },
});

export const {
  setUserData,
  setUserRole,
  setUserAddress,
  setUserPhone,
  setAccessToken,
  setTokenMaxAge,
  setLocationData,
  setSearchTerm,
  searchRestaurant,
  clearSearchTerm,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
