import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
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
  data: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
    },

    // * Create
    createStart: (state, actions) => {
      state.isLoading = true;
    },
    createSucceed: (state) => {
      toast.success("Thêm đánh giá thành công.");
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
  },
});

const useReviewSlice = () => useSelector((state) => state.review);

const reviewActions = reviewSlice.actions;

const reviewReducer = reviewSlice.reducer;

export { reviewActions, useReviewSlice };
export default reviewReducer;
