import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from '../slices/tagsSlice';

const store = configureStore({
    reducer: {
        tags: tagsReducer,
    },
});

export default store;
