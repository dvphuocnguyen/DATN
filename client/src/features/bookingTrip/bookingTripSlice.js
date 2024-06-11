import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
  filters: {
    page: 1,
    limit: 5,
  },
  paginations: {
    page: 1,
    limit: 5,
    totalPage: 5,
  },
};

const bookingTripSlice = createSlice({
  name: "bookingTrip",
  initialState,
  reducers: {
    // * Create
    createStart: (state, actions) => {
      state.isLoading = true;
    },
    createSucceed: (state) => {
      state.isLoading = false;
    },
    failed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      toast.error(state.error);
    },

    // * GET ALL
    getAllStart: (state, actions) => {
      state.isLoading = true;
    },
    getAllSucceed: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.result;
      state.paginations = {
        ...state.paginations,
        ...payload.paginations,
      };
    },

    // * GET Options ALL
    getAllOptionsStart: (state, actions) => {
      state.isLoading = true;
    },
    getAllOptionsSucceed: (state, { payload }) => {
      state.isLoading = false;
      state.dataOptions = payload;
    },

    // * UPDATE placeE.
    updateStart: (state, actions) => {
      state.isLoading = true;
    },
    updateSucceed: (state) => {
      state.isLoading = false;
    },

    // * SET FILTER
    setFilter: (state, { payload }) => {
      state.filters = {
        ...state.filters,
        ...payload,
      };
    },

    // * Use debounce search name
    setDebounceName: (state, actions) => {},

    confirmBookingTripStart: (state, actions) => {},
  },
});

const useBookingTripSlice = () => useSelector((state) => state.bookingTrip);

const bookingTripActions = bookingTripSlice.actions;

const bookingTripReducer = bookingTripSlice.reducer;

export { bookingTripActions, useBookingTripSlice };
export default bookingTripReducer;
