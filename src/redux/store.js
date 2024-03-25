import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from "./client/filters.slice";
import cartsReducer from "./client/carts.slice";
import apiSlice from "./api/api.slice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        filters: filtersReducer,
        carts: cartsReducer,
    },
    middleware: getDefault => getDefault().concat(apiSlice.middleware),
})

export default store;