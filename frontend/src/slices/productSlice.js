import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",

  initialState: {
    loading: false,
    product: {},
    isReviewSubmitted: false,
    isProductCreated: false,
    isProductDeleted: false,
    isProductUpdated: false,
    isReviewDeleted: false,
    reviews: [],
  },

  reducers: {
    // Fetch product
    productRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    productSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    },

    productFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Create review
    createReviewRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    createReviewSuccess(state) {
      return {
        ...state,
        loading: false,
        isReviewSubmitted: true,
      };
    },

    createReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearReviewSubmitted(state) {
      return {
        ...state,
        isReviewSubmitted: false,
      };
    },

    // Clear error
    clearError(state) {
      return {
        ...state,
        error: null,
      };
    },

    // Clear product
    clearProduct(state) {
      return {
        ...state,
        product: {},
      };
    },

    // Create product
    newProductRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    newProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        isProductCreated: true,
      };
    },

    newProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isProductCreated: false,
      };
    },

    clearProductCreated(state) {
      return {
        ...state,
        isProductCreated: false,
      };
    },

    // Delete product
    deleteProductRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteProductSuccess(state) {
      return {
        ...state,
        loading: false,
        isProductDeleted: true,
      };
    },

    deleteProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearProductDeleted(state) {
      return {
        ...state,
        isProductDeleted: false,
      };
    },

    // Update product
    updateProductRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    updateProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        isProductUpdated: true,
      };
    },

    updateProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearProductUpdated(state) {
      return {
        ...state,
        isProductUpdated: false,
      };
    },

    // Fetch reviews
    reviewsRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    reviewsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews,
      };
    },

    reviewsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Delete review
    deleteReviewRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteReviewSuccess(state) {
      return {
        ...state,
        loading: false,
        isReviewDeleted: true,
      };
    },

    deleteReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearReviewDeleted(state) {
      return {
        ...state,
        isReviewDeleted: false,
      };
    },
  },
});

const { actions, reducer } = productSlice;

export const {
  productRequest,
  productSuccess,
  productFail,

  createReviewFail,
  createReviewRequest,
  createReviewSuccess,
  clearReviewSubmitted,

  clearError,
  clearProduct,

  newProductFail,
  newProductSuccess,
  newProductRequest,
  clearProductCreated,

  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  clearProductDeleted,

  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
  clearProductUpdated,

  reviewsRequest,
  reviewsFail,
  reviewsSuccess,

  deleteReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  clearReviewDeleted,
} = actions;

export default reducer;
